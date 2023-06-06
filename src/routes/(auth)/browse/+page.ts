import { CurrentSession } from '@/stores/session';
import type { PageLoad } from './$types';
import type { BaseItemDto } from '@jellyfin/sdk/lib/generated-client';

export const load = (async () => {
    const itemsRows = [];
    const userId = CurrentSession.getAuth()!.User!.Id!;

    const itemsApi = CurrentSession.getItemsApi();
    const tvShowsApi = CurrentSession.getTvShowsApi();

    // Continue watching items
    const { data: resumeItems } = await itemsApi.getResumeItems({
        userId: userId,
        mediaTypes: ['Video'],
        limit: 24,
        fields: ['PrimaryImageAspectRatio', 'BasicSyncInfo', 'Overview'], // todo remove overview?
        imageTypeLimit: 1,
        enableImageTypes: ['Primary', 'Backdrop', 'Thumb'],
        enableTotalRecordCount: false
    });

    // Episodes up next
    const { data: upNextItems } = await tvShowsApi.getNextUp({
        userId: userId,
        limit: 24,
        fields: ['PrimaryImageAspectRatio', 'BasicSyncInfo', 'DateCreated', 'Path', 'MediaSourceCount'],
        imageTypeLimit: 1,
        enableImageTypes: ['Primary', 'Backdrop', 'Thumb', 'Banner'],
        enableTotalRecordCount: false,
        disableFirstEpisode: false,
        enableRewatching: false
    });

    // Latest

    // Genres

    // Construct rows
    const fullContinue: BaseItemDto[] = [];
    resumeItems.Items?.forEach(item => fullContinue.push(item));
    upNextItems.Items?.forEach(item => fullContinue.push(item));

    if (fullContinue.length > 0) itemsRows.push({
        title: 'Continue Watching',
        items: fullContinue
    });

    // Featured item
    // Todo: take from latest
    const featuredData = {
        title: null,
        description: null,
        logoUrl: null,
        backdropUrl: null
    };

    if (resumeItems.Items?.length > 0) {
        const featuredItem = resumeItems.Items[0];

        featuredData.title = featuredItem.Name;
        featuredData.description = featuredItem.Overview;
        featuredData.logoUrl = `http://jellyfin.local:8096/Items/${featuredItem.Id}/Images/Logo`;
        featuredData.backdropUrl = `http://jellyfin.local:8096/Items/${featuredItem.Id}/Images/Backdrop`;
    }

    console.log(itemsRows);

    return {
        featured: featuredData,
        rows: itemsRows
    };
}) satisfies PageLoad;