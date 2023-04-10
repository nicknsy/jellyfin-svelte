export const ssr = false;

import { browser } from "$app/environment";
import { goto } from "$app/navigation";

if (browser) {
    const { CurrentSession } = await import("@/stores/session");

    if (!CurrentSession?.getAuth()?.AccessToken) {
        goto('/login');
    }
}