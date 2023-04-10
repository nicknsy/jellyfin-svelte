<script lang="ts">
    import type { BaseItemDto } from '@jellyfin/sdk/lib/generated-client';
    import { onMount } from 'svelte';
    import { CurrentSession } from '@/stores/session';
	import { getUserViewsApi } from '@jellyfin/sdk/lib/utils/api';

    import logo from '$lib/assets/logo.png';
    
    let items: BaseItemDto[] | null | undefined;

    onMount(async () => {
        try {
            const { data } = await getUserViewsApi(CurrentSession.getJellyfinApi()).getUserViews({
                userId: CurrentSession.getAuth()!.User!.Id!
            });

            items = data.Items;
        } catch (error) {
            console.error(error);
        }
    });
</script>

<nav class="w-full flex justify-between py-5 px-16 items-center fixed top-0 shadow-lg bg-black/50 z-50">
    <div class="flex justify-center items-center gap-5">
        <img alt="Logo" src={logo} class="w-10 mr-5">
        <a href="/browse">Home</a>
        {#if items}
            {#each items as item}
                <a href="/browse/library/{item.Id}">{item.Name}</a>
            {/each}
        {/if}
    </div>
    <div>
        <a href="/login">Log Out</a>
    </div>
</nav>