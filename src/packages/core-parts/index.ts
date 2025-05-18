import * as Diff from 'diff';

export type SubstitutePatch =
  | {
      type: 'keep';
      value: string;
      from?: undefined;
      to?: undefined;
    }
  | {
      type: 'change';
      value?: undefined;
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
    let conflictingPatches: SubstitutePatch[] = [];

    patches.forEach((patch) => {
      const scannedText = mutablePrevText.slice(0, scannedLength);
      const unScannedText = mutablePrevText.slice(scannedLength);

      if (patch.type === 'keep') {
        if (unScannedText.indexOf(patch.value) === -1) {
          let diffLength = 0;

          Diff.diffWords(patch.value, unScannedText)
            .slice(0, -1)
            .forEach(({ added, removed, value }) => {
              if (added) {
                diffLength += value.length;
              } else if (removed) {
                diffLength -= value.length;
              }
            });

          scannedLength += patch.value.length + diffLength;
        } else {
          scannedLength += patch.value.length;
        }

        if (conflictingPatches.length) {
          conflictingPatches.push({
            type: 'change',
            from: patch.value,
            to: patch.value,
          });
        }
      } else {
        if (unScannedText.indexOf(patch.from) === -1) {
          let diffLength = 0;

          Diff.diffChars(patch.from, unScannedText)
            .slice(0, -1)
            .forEach(({ count = 0, added, removed }) => {
              if (added) {
                diffLength += count;
              } else if (removed) {
                diffLength -= count;
              }
            });

          scannedLength += patch.from.length + diffLength;
          conflictingPatches.push(patch);

          const conflictingFromText = conflictingPatches.map(({ from }) => from).join('');
          const conflictingToText = conflictingPatches.map(({ to }) => to).join('');

          const wordDiffs = Diff.diffWords(conflictingFromText, conflictingToText);
          const removedTextWithoutSpaces = wordDiffs
            .filter(({ removed }) => removed)
            .map(({ value }) => value.trim())
            .join('');
          const addedTextWithoutSpaces = wordDiffs
            .filter(({ added }) => added)
            .map(({ value }) => value.trim())
            .join('');

          if (removedTextWithoutSpaces === addedTextWithoutSpaces) {
            conflictingPatches = [];
          } else {
            // Note: A case study is needed.
          }
        } else {
          if (conflictingPatches.length === 0) {
            mutablePrevText = `${scannedText}${unScannedText.replace(
              patch.from,
              patch.to.replace(/\$/g, '$$$$'),
            )}`;
            scannedLength += patch.to.length;
          } else {
            conflictingPatches.push(patch);

            const conflictingFromText = conflictingPatches.map(({ from }) => from).join('');
            const conflictingToText = conflictingPatches.map(({ to }) => to).join('');

            const wordDiffs = Diff.diffWords(conflictingFromText, conflictingToText);
            const removedTextWithoutSpaces = wordDiffs
              .filter(({ removed }) => removed)
              .map(({ value }) => value.trim())
              .join('');
            const addedTextWithoutSpaces = wordDiffs
              .filter(({ added }) => added)
              .map(({ value }) => value.trim())
              .join('');

            if (removedTextWithoutSpaces === addedTextWithoutSpaces) {
              scannedLength += patch.from.length;
              conflictingPatches = [];
            } else {
              // Note: A case study is needed.
            }
          }
        }
      }
    });

    return mutablePrevText;
  }, text);
}
