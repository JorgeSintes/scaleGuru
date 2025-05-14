export type ScaleDefinition = {
  name: string;
  alternateName?: string;
  degrees: string[];
};

export const major: ScaleDefinition = {
  name: 'Major',
  degrees: ['1', '2', '3', '4', '5', '6', '7'],
};
export const dorian: ScaleDefinition = {
  name: 'Dorian',
  degrees: ['1', '2', 'b3', '4', '5', '6', 'b7'],
};
export const phrygian: ScaleDefinition = {
  name: 'Phrygian',
  degrees: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'],
};
export const lydian: ScaleDefinition = {
  name: 'Lydian',
  degrees: ['1', '2', '3', '#4', '5', '6', '7'],
};
export const mixolydian: ScaleDefinition = {
  name: 'Mixolydian',
  degrees: ['1', '2', '3', '4', '5', '6', 'b7'],
};
export const minor: ScaleDefinition = {
  name: 'Minor',
  degrees: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
};
export const locrian: ScaleDefinition = {
  name: 'Locrian',
  degrees: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
};

export const melodicMinor: ScaleDefinition = {
  name: 'Melodic Minor',
  degrees: ['1', '2', 'b3', '4', '5', '6', '7'],
};
export const lydianAugmented: ScaleDefinition = {
  name: 'Lydian Augmented',
  degrees: ['1', '2', '3', '#4', '#5', '6', '7'],
};
export const lydianDominant: ScaleDefinition = {
  name: 'Lydian Dominant',
  degrees: ['1', '2', '3', '#4', '5', '6', 'b7'],
};
export const locrianNatural9: ScaleDefinition = {
  name: 'Locrian Natural 9',
  degrees: ['1', '2', 'b3', '4', 'b5', 'b6', 'b7'],
};
export const altered: ScaleDefinition = {
  name: 'Altered',
  alternateName: 'Super Locrian',
  degrees: ['1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
};

export const harmonicMinor: ScaleDefinition = {
  name: 'Harmonic Minor',
  degrees: ['1', '2', 'b3', '4', '5', 'b6', '7'],
};
export const locrianNatural13: ScaleDefinition = {
  name: 'Locrian Natural 13',
  degrees: ['1', 'b2', 'b3', '4', 'b5', '6', 'b7'],
};
export const ionianAugmented: ScaleDefinition = {
  name: 'Ionian Augmented',
  degrees: ['1', '2', '3', '4', '#5', '6', '7'],
};
export const mixolydianFlat9Flat13: ScaleDefinition = {
  name: 'Myxolydian b9 b13',
  alternateName: 'Phrygian Dominant',
  degrees: ['1', '2', '3', '4', '#5', '6', '7'],
};
export const ultraLocrian: ScaleDefinition = {
  name: 'Ultra Locrian',
  alternateName: 'Altered Diminished',
  degrees: ['1', 'b2', 'b3', 'b4', 'b5', 'b6', 'bb7'],
};

export const allScales: ScaleDefinition[] = [
  major,
  dorian,
  phrygian,
  lydian,
  mixolydian,
  minor,
  locrian,
  melodicMinor,
  lydianAugmented,
  lydianDominant,
  locrianNatural9,
  altered,
  harmonicMinor,
  locrianNatural13,
  ionianAugmented,
  mixolydianFlat9Flat13,
  ultraLocrian,
];
