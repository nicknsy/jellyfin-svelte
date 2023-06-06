import { CurrentSession } from '@/stores/session';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    const mediaSourceId = params.slug;
    const mediaInfoApi = CurrentSession.getMediaInfoApi();
    
    await mediaInfoApi.getPlaybackInfo({
        itemId: mediaSourceId,
        userId: CurrentSession.getAuth()!.User!.Id!
    });

    return {
        assetUri: `http://jellyfin.local:8096/Videos/${mediaSourceId}/stream.mp4?static=True`
    };
}) satisfies PageLoad;