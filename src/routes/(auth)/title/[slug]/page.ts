import { getItemsApi } from '@jellyfin/sdk/lib/utils/api';
import type { PageLoad } from './$types';
import { CurrentSession } from '@/stores/session';
import { browser } from '$app/environment';

export const load = (async ({ params }) => {
    document.getAnimations();
    if (!browser) return {};

    const currentItem = getItemsApi(CurrentSession.getJellyfinApi()).getItems({
        ids: [ params.slug ]
    });

    console.log(currentItem);

    return {};
}) satisfies PageLoad;