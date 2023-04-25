import type { PageLoad } from './$types';
import { getItemsApi } from '@jellyfin/sdk/lib/utils/api';
import { CurrentSession } from '@/stores/session';
import { browser } from '$app/environment';

export const load = (async ({ params }) => {
    document.getAnimations();
    if (!browser) return {};

    const { data } = await getItemsApi(CurrentSession.getJellyfinApi()).getItems({
        ids: [ params.slug ]
    });

    console.log(data);

    return {};
}) satisfies PageLoad;