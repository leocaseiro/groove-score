import { writable } from 'svelte/store';

export function createToggle() {
    const { subscribe, set, update } = writable<boolean>(undefined);

    return {
        subscribe,
        toggle: () => {
            update((v: boolean) => !v);
        },
        set: (v: boolean) => set(v)
    };
}
