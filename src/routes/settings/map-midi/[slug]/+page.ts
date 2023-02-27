import type { PageLoad } from './$types';

export const load = (({ params }) => {
  return {
    sound: params.slug,
  };
}) satisfies PageLoad;
