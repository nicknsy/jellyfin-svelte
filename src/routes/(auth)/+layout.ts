import type { LayoutLoad } from './$types';
import { CurrentSession } from '@/stores/session';
import { browser } from "$app/environment";
import { goto } from "$app/navigation";

export const load = (async () => {
    if (browser) {
        //const { CurrentSession } = await import("@/stores/session");
    
        if (!CurrentSession?.getAuth()?.AccessToken) {
            console.log('goto login');
            goto('/login');
        }
    }

    return {};
}) satisfies LayoutLoad;