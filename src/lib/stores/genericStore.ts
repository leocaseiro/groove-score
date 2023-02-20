import { writable } from 'svelte/store';

export function createGeneric<T>() {
	const { subscribe, set, update } = writable<T>(undefined);

	return {
		subscribe,
        update,
		set,
	};
}
