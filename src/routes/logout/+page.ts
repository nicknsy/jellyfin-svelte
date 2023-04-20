import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { PageLoad } from './$types';

export const load = (async () => {
    if (browser) {
        window.localStorage.removeItem('jellyfin-auth');
        goto('/login');
    }

    return {};
}) satisfies PageLoad;