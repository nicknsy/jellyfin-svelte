import type { PageLoad } from './$types';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

export const load = (async () => {
    if (browser) {
        const { CurrentSession } = await import("@/stores/session");
    
        if (CurrentSession?.getAuth()?.AccessToken) {
            goto('/browse');
            got
        }
    }

    return {};
}) satisfies PageLoad;