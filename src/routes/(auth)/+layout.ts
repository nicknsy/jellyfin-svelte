import type { LayoutLoad } from './$types';
import { CurrentSession } from '@/stores/session';
import { goto } from "$app/navigation";

export const load = (async () => {
    if (!CurrentSession.getAuth()?.AccessToken || !CurrentSession.getAuth()?.User?.Id) {
        goto('/login');
    }

    return {};
}) satisfies LayoutLoad;