import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { PageLoad } from './$types';

export const load = (async () => {
    if (browser) {
        const { CurrentSession } = await import("@/stores/session");

        CurrentSession.clearAuth();
        goto('/login');
    }

    return {};
}) satisfies PageLoad;