import * as Diff from 'diff';

export type SubstitutePatch =
  | {
      type: 'keep';
      value: string;
    }
  | {
      type: 'change';
      from: string;
      to: string;
    };

export function makePatches(oldStr: string, newStr: string): SubstitutePatch[] {
  if (oldStr === newStr) {
    return [];
  }

  const patches: SubstitutePatch[] = [];
  let temporaryText: string | null = null;

  Diff.diffLines(oldStr, newStr).forEach((change) => {
    if (change.added && change.removed) {
      throw new Error('Unexpected change');
    } else if (change.removed) {
      if (temporaryText !== null) {
        patches.push({ type: 'change', from: temporaryText, to: '' });
      }
      temporaryText = change.value;
    } else if (change.added) {
      if (temporaryText === null) {
        patches.push({ type: 'change', from: '', to: change.value });
      } else {
        patches.push({ type: 'change', from: temporaryText, to: change.value });
        temporaryText = null;
      }
    } else {
      if (temporaryText !== null) {
        patches.push({ type: 'change', from: temporaryText, to: '' });
        temporaryText = null;
      }
      patches.push({ type: 'keep', value: change.value });
    }
  });

  return patches;
}

export function applyPatches(text: string, patchesPerPlugin: SubstitutePatch[][]): string {
  return patchesPerPlugin.reduce((patchedPrevText, patches) => {
    if (patches.length === 0) {
      return patchedPrevText;
    }

    let mutablePrevText = patchedPrevText;
    let scannedLength = 0;

    patches.forEach((patch) => {
      if (patch.type === 'keep') {
        scannedLength += patch.value.length;
      } else {
        const prefix = mutablePrevText.slice(0, scannedLength);
        const suffix = mutablePrevText.slice(scannedLength);

        if (suffix.indexOf(patch.from) === -1) {
          /**
           * A correction value to skip other corresponding patches when a specific patch fails to be applied.
           */
          const skipLength = patch.from.length - patch.to.length;

          scannedLength += patch.from.length + skipLength;
        } else {
          mutablePrevText = `${prefix}${suffix.replace(
            patch.from,
            patch.to.replace(/\$/g, '$$$$'),
          )}`;
          scannedLength += patch.to.length;
        }
      }
    });

    return mutablePrevText;
  }, text);
}
