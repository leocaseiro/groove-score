import { writable } from 'svelte/store';
import { createToggle } from './toggleStore';
import type { MidiInput } from './models/midiInputModel';

export { db } from './dbStore';

export const darkTheme = createToggle();
export const drawer = createToggle();
export const midiInputs = writable<MidiInput[]>();
