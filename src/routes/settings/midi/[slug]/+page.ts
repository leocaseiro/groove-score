import { liveQuery } from 'dexie';

import { db } from '$stores';
import { browser } from '$app/environment';

import type { PageLoad } from './$types';

export const csr = true;
export const prerender = false;

export const load = (({ params }) => {
    const note = liveQuery(() => (browser ? db.notes.get(params.slug) : undefined));
    return {
        note
    };
}) satisfies PageLoad;
