import { browser } from '$app/environment';
import type { PageLoad } from './$types';
import type { BaseItemDto } from '@jellyfin/sdk/lib/generated-client';

export const load = (async (params: any) => {
    if (!browser) return {};

    const { CurrentSession } = await import('@/stores/session');
    const { getItemsApi } = await import('@jellyfin/sdk/lib/utils/api');

    let libraryItems: BaseItemDto[] = [];
    try {
        const { data } = await getItemsApi(CurrentSession.getJellyfinApi()).getItems({
            userId: CurrentSession.getAuth()!.User!.Id,
            parentId: params.slug
        });

        console.log(data);
        if (data.Items) libraryItems = data.Items;
    } catch (error) {
        console.error(error);
    }

    return {
        'Items': libraryItems
    }
}) satisfies PageLoad;