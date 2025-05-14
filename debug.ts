import { Note } from './src/lib/core/note.ts';
import { Scale } from './src/lib/core/scale.ts';
import * as def from './src/lib/core/scaleDefinition.ts';

const n3 = new Note('C#', 4);
const sc = new Scale(n3, def.major);
console.log(sc.ascending());
console.log(sc.simplify().ascending());
