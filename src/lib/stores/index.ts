import { createGeneric } from './genericStore';
import { createToggle } from './toggleStore';
import type { TuneObject } from 'abcjs';

export { db } from './dbStore';

export const darkTheme = createToggle();
export const drawer = createToggle();
export const midiUsb = createToggle();
export const visualObj = createGeneric<TuneObject>();
