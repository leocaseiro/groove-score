import { writable } from 'svelte/store';

function createDarkTheme() {
	const { subscribe, set, update } = writable<boolean>(undefined);

	return {
		subscribe,
		toggle: () => {
			update((v: boolean) => !v);
		},
		set: (v: boolean) => set(v),
	};
}

export const darkTheme = createDarkTheme();
