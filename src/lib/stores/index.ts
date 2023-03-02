import { createGeneric } from './genericStore';
import { createToggle } from './toggleStore';
import type { TuneObject } from 'abcjs';

export { db as midiDB } from './midi/midiStore';

export const darkTheme = createToggle();
export const drawer = createToggle();
export const visualObj = createGeneric<TuneObject>();