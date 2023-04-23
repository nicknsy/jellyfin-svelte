import { browser } from '$app/environment';
import type { BaseItemDto } from '@jellyfin/sdk/lib/generated-client';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    if (!browser) return {};

    const { CurrentSession } = await import('@/stores/session');
    const { getItemsApi } = await import('@jellyfin/sdk/lib/utils/api');
    const { SortOrder, BaseItemKind, ItemFields, ImageType } = await import('@jellyfin/sdk/lib/generated-client');

    let libraryItems: BaseItemDto[] = [];
    try {
        const { data } = await getItemsApi(CurrentSession.getJellyfinApi()).getItemsByUserId({
            userId: CurrentSession.getAuth()!.User!.Id!,
            parentId: params.slug,
            includeItemTypes: [BaseItemKind.Series],
            startIndex: 0,
            limit: 100,
            sortBy: ['SortName'],
            sortOrder: [SortOrder.Ascending],
            recursive: true,
            fields: [ItemFields.PrimaryImageAspectRatio, ItemFields.BasicSyncInfo],
            imageTypeLimit: 1,
            enableImageTypes: [ImageType.Primary, ImageType.Backdrop, ImageType.Banner, ImageType.Thumb]
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