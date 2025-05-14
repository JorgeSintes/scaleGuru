import { PersistentState } from '@friendofsvelte/state';

export const selectedRoot = new PersistentState('selectedRoot', 'C', 'localStorage');
export const selectedScale = new PersistentState('selectedScale', 'Major', 'localStorage');
