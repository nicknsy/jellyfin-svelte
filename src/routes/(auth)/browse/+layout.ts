import { CurrentSession } from '@/stores/session';
import type { LayoutLoad } from './$types';

export const load = (async () => {
    let viewItems;
    let profileImageUrl;

    /*
     * Get data for header/nav
     */
    try {
        // Profile picture
        profileImageUrl = CurrentSession.getProfileImageUrl();

        // Libraries
        const { data: userViews } = await CurrentSession.getUserViewsApi().getUserViews({
            userId: CurrentSession.getAuth()!.User!.Id!
        });
        viewItems = userViews.Items;
    } catch (error) {
        console.error(error);
    }

    return {
        views: viewItems,
        profileImage: profileImageUrl
    };
}) satisfies LayoutLoad;