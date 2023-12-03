import * as Diff from 'diff';

enum PairingMode {
  EVEN = 'even',
  ODD = 'odd',
}

export type SubstitutePatch = {
  from: string;
  to: string;
};

export function makePatches(oldStr: string, newStr: string): SubstitutePatch[] {
  if (oldStr === newStr) {
    return [];
  }

  const patches: SubstitutePatch[] = [];
  let temporaryText = '';
  let mode: PairingMode = PairingMode.EVEN;

  Diff.diffLines(oldStr, newStr)
    .filter((change) => 'added' in change && 'removed' in change)
    .forEach((change) => {
      if (!change.added && change.removed) {
        if (mode === PairingMode.EVEN) {
          temporaryText = change.value;
          mode = PairingMode.ODD;
        } else {
          patches.push({ from: temporaryText, to: '' });
          temporaryText = change.value;
        }
      } else if (change.added && !change.removed) {
        if (mode === PairingMode.EVEN) {
          patches.push({ from: '', to: change.value });
        } else {
          patches.push({ from: temporaryText, to: change.value });
          mode = PairingMode.EVEN;
        }
      }
    });

  return patches;
}

export function applyPatches(text: string, patches: SubstitutePatch[]): string {
  return patches.reduce((patchedPrevText, { from, to }) => patchedPrevText.replace(from, to), text);
}
