const noteNamesF = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const noteNamesS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const naturalNoteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const allNoteNames = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B',
];

function getNextNaturalNote(noteName: string, step: number = 1) {
  if (!naturalNoteNames.includes(noteName)) {
    throw new Error(`Invalid natural note name: ${noteName}`);
  }
  let thisNoteIdx = naturalNoteNames.indexOf(noteName);
  return naturalNoteNames[(thisNoteIdx + 7 + step) % 7];
}

function isValidNoteName(noteName: string): boolean {
  if (!naturalNoteNames.includes(noteName[0])) {
    return false;
  }
  if (noteName.length >= 2) {
    let accidentalType = noteName[1];
    if (accidentalType !== '#' && accidentalType !== 'b') return false;
    for (const post of noteName.slice(2)) {
      if (post !== accidentalType) {
        return false;
      }
    }
  }

  return true;
}

function noteToAbsPosition(name: string, octave: number): number {
  if (noteNamesF.includes(name)) {
    return noteNamesF.indexOf(name) + octave * 12;
  } else if (noteNamesS.includes(name)) {
    return noteNamesS.indexOf(name) + octave * 12;
  } else {
    let accidentVal = 0;
    for (const token of name.slice(1)) {
      if (token === '#') {
        accidentVal++;
      } else if (token === 'b') {
        accidentVal--;
      }
    }
    return noteToAbsPosition(name[0], octave) + accidentVal;
  }
}

export class Note {
  name: string;
  octaveNum: number;
  absPosition: number;

  constructor(name: string, octaveNum: number) {
    if (!isValidNoteName(name)) {
      throw new Error(`Invalid note name: ${name}`);
    }
    this.name = name;
    this.octaveNum = octaveNum;
    this.absPosition = noteToAbsPosition(this.name, this.octaveNum);
  }

  static fromAbsPosition(absPosition: number, prefers: '#' | 'b' = 'b'): Note {
    let noteName;
    let octave = Math.floor(absPosition / 12);
    if (prefers == '#') {
      noteName = noteNamesS[absPosition % 12];
    } else {
      noteName = noteNamesF[absPosition % 12];
    }
    return new Note(noteName, octave);
  }

  static fromAbsPositionAndName(absPosition: number, noteName: string): Note {
    var pos = noteToAbsPosition(noteName, 0);
    var offset = (absPosition - pos) % 12;
    if (offset <= 6) {
      var octave = Math.floor((absPosition - pos) / 12);
    } else {
      var octave = Math.floor((absPosition - pos) / 12) + 1;
      offset = offset - 12;
    }
    if (offset >= 0) {
      return new Note(noteName + '#'.repeat(offset), octave);
    } else {
      return new Note(noteName + 'b'.repeat(Math.abs(offset)), octave);
    }
  }

  get position() {
    return this.absPosition % 12;
  }

  getAccidentVal(): number {
    let accidentVal = 0;
    for (const token of this.name.slice(1)) {
      if (token === '#') {
        accidentVal++;
      } else if (token === 'b') {
        accidentVal--;
      }
    }
    return accidentVal;
  }

  getNumAccidentals(): number {
    return this.name.slice(1).length;
  }

  reduceAccidentals(): Note {
    return Note.fromAbsPosition(this.absPosition, this.getAccidentVal() > 0 ? '#' : 'b');
  }

  enharmonicEquivalent(): Note {
    if (!allNoteNames.includes(this.name)) {
      return this.reduceAccidentals();
    }
    if (noteNamesF.includes(this.name)) {
      return new Note(noteNamesS[this.position], this.octaveNum);
    }
    return new Note(noteNamesF[this.position], this.octaveNum);
  }

  equals(other: Note): boolean {
    return this.absPosition === other.absPosition;
  }
  distanceTo(other: Note): number {
    return other.absPosition - this.absPosition;
  }
  augment(): Note {
    if (this.getAccidentVal() >= 0) {
      return new Note(this.name + '#', this.octaveNum);
    }
    return new Note(this.name.slice(0, -1), this.octaveNum);
  }
  diminish(): Note {
    if (this.getAccidentVal() <= 0) {
      return new Note(this.name + 'b', this.octaveNum);
    }
    return new Note(this.name.slice(0, -1), this.octaveNum);
  }
  halfstepUp(): Note {
    return this.augment().reduceAccidentals();
  }
  halfstepDown(): Note {
    return this.diminish().reduceAccidentals();
  }

  // Intervals
  minorSecond(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 1, getNextNaturalNote(this.name[0], -1));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 1, getNextNaturalNote(this.name[0], 1));
  }
  majorSecond(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 2, getNextNaturalNote(this.name[0], -1));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 2, getNextNaturalNote(this.name[0], 1));
  }
  augmentedSecond(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 3, getNextNaturalNote(this.name[0], -1));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 3, getNextNaturalNote(this.name[0], 1));
  }
  minorThird(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 3, getNextNaturalNote(this.name[0], -2));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 3, getNextNaturalNote(this.name[0], 2));
  }
  majorThird(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 4, getNextNaturalNote(this.name[0], -2));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 4, getNextNaturalNote(this.name[0], 2));
  }
  diminishedFourth(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 4, getNextNaturalNote(this.name[0], -3));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 4, getNextNaturalNote(this.name[0], 3));
  }
  perfectFourth(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 5, getNextNaturalNote(this.name[0], -3));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 5, getNextNaturalNote(this.name[0], 3));
  }
  augmentedFourth(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 6, getNextNaturalNote(this.name[0], -3));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 6, getNextNaturalNote(this.name[0], 3));
  }
  diminishedFifth(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 6, getNextNaturalNote(this.name[0], -4));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 6, getNextNaturalNote(this.name[0], 4));
  }
  perfectFifth(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 7, getNextNaturalNote(this.name[0], -4));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 7, getNextNaturalNote(this.name[0], 4));
  }
  augmentedFifth(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 8, getNextNaturalNote(this.name[0], -4));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 8, getNextNaturalNote(this.name[0], 4));
  }
  minorSixth(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 8, getNextNaturalNote(this.name[0], -5));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 8, getNextNaturalNote(this.name[0], 5));
  }
  majorSixth(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 9, getNextNaturalNote(this.name[0], -5));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 9, getNextNaturalNote(this.name[0], 5));
  }
  augmentedSixth(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 10, getNextNaturalNote(this.name[0], -5));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 10, getNextNaturalNote(this.name[0], 5));
  }
  diminishedSeventh(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 9, getNextNaturalNote(this.name[0], -6));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 9, getNextNaturalNote(this.name[0], 6));
  }
  minorSeventh(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 10, getNextNaturalNote(this.name[0], -6));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 10, getNextNaturalNote(this.name[0], 6));
  }
  majorSeventh(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 11, getNextNaturalNote(this.name[0], -6));
    }
    return Note.fromAbsPositionAndName(this.absPosition + 11, getNextNaturalNote(this.name[0], 6));
  }
  octave(descending: boolean = false): Note {
    if (descending) {
      return Note.fromAbsPositionAndName(this.absPosition - 12, this.name[0]);
    }
    return Note.fromAbsPositionAndName(this.absPosition + 12, this.name[0]);
  }
}

export const allNotes: Map<string, Note> = new Map([
  ['C', new Note('C', 4)],
  ['C#', new Note('C#', 4)],
  ['Db', new Note('Db', 4)],
  ['D', new Note('D', 4)],
  ['D#', new Note('D#', 4)],
  ['Eb', new Note('Eb', 4)],
  ['E', new Note('E', 4)],
  ['F', new Note('F', 4)],
  ['F#', new Note('F#', 4)],
  ['Gb', new Note('Gb', 4)],
  ['G', new Note('G', 4)],
  ['G#', new Note('G#', 4)],
  ['Ab', new Note('Ab', 4)],
  ['A', new Note('A', 4)],
  ['A#', new Note('A#', 4)],
  ['Bb', new Note('Bb', 4)],
  ['B', new Note('B', 3)],
]);
