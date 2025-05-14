import { Note } from './note.ts';
import type { ScaleDefinition } from './scaleDefinition.ts';

function getInterval(note: Note, interval: string) {
  switch (interval) {
    case '1':
      return note;
    case 'b2':
      return note.minorSecond();
    case '2':
      return note.majorSecond();
    case 'b3':
      return note.minorThird();
    case '3':
      return note.majorThird();
    case 'b4':
      return note.diminishedFourth();
    case '4':
      return note.perfectFourth();
    case '#4':
      return note.augmentedFourth();
    case 'b5':
      return note.diminishedFifth();
    case '5':
      return note.perfectFifth();
    case 'b6':
      return note.minorSixth();
    case '6':
      return note.majorSixth();
    case 'bb7':
      return note.diminishedSeventh();
    case 'b7':
      return note.minorSeventh();
    case '7':
      return note.majorSeventh();
    default:
      throw new Error(`Unknown interval: ${interval}`);
  }
}

export class Scale {
  root: Note;
  notes: Note[];
  name: string;
  definition: ScaleDefinition;

  constructor(root: Note, definition: ScaleDefinition) {
    this.root = root;
    this.definition = definition;
    this.name = `${root} ${definition.name}`;
    this.notes = this.generateNotes();
  }

  private generateNotes(): Note[] {
    let notes = [];
    for (const degree of this.definition.degrees) {
      notes.push(getInterval(this.root, degree));
    }
    return notes;
  }

  ascending(): Note[] {
    return this.notes.concat(this.root.octave());
  }

  descending(): Note[] {
    let scale = [this.root.octave()];
    return scale.concat([...this.notes].reverse());
  }

  getNumAccidentals(): number {
    let numAccidentals = 0;
    for (const note of this.notes) {
      numAccidentals += note.getNumAccidentals();
    }
    return numAccidentals;
  }

  simplify(): Scale {
    let otherScale = new Scale(this.root.enharmonicEquivalent(), this.definition);
    if (otherScale.getNumAccidentals() < this.getNumAccidentals()) {
      return otherScale;
    }
    return this;
  }
}
