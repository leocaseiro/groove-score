import { writable } from 'svelte/store';
import { createToggle } from './toggleStore';

export { db } from './dbStore';

export const darkTheme = createToggle();
export const drawer = createToggle();
export const midiInputs = writable<{ id: string; name: string }[]>([]);
