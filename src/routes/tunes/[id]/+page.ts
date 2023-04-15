import { liveQuery } from 'dexie';

import { db } from '$stores';
import { browser } from '$app/environment';

import type { PageLoad } from './$types';

export const csr = true;
export const prerender = false;

export const load = (({ params }) => {
    const tune = liveQuery(() => (browser ? db.tunes.get({ id: Number(params.id) }) : undefined));
    return {
        tune
    };
}) satisfies PageLoad;
