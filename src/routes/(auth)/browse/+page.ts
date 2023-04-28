import { CurrentSession } from '@/stores/session';
import type { PageLoad } from './$types';
import type { BaseItemDto } from '@jellyfin/sdk/lib/generated-client';

export const load = (async () => {
    const itemsRows = [];
    const userId = CurrentSession.getAuth()!.User!.Id!;

    // Continue watching items
    const { data: resumeItems } = await CurrentSession.getItemsApi().getResumeItems({
        userId: userId,
        mediaTypes: ['Video'],
        limit: 24,
        fields: ['PrimaryImageAspectRatio', 'BasicSyncInfo'],
        imageTypeLimit: 1,
        enableImageTypes: ['Primary', 'Backdrop', 'Thumb'],
        enableTotalRecordCount: false
    });

    // Episodes up next
    const { data: upNextItems } = await CurrentSession.getTvShowsApi().getNextUp({
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

    // Backdrop item

    // Construct rows
    const fullContinue: BaseItemDto[] = [];
    resumeItems.Items?.forEach(item => fullContinue.push(item));
    upNextItems.Items?.forEach(item => fullContinue.push(item));

    if (fullContinue.length > 0) itemsRows.push({
        title: 'Continue Watching',
        items: fullContinue
    });

    console.log(itemsRows);

    return {
        rows: itemsRows
    };
}) satisfies PageLoad;