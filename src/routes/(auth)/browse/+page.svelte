<script lang="ts">
	import type { PageData } from "./$types";

    import MediaRow from './MediaRow.svelte';
    import backdrop from '$lib/assets/backdrop.webp';

    export let data: PageData;
</script>

<svelte:head>
    <title>Jellyfin - Browse</title>
</svelte:head>

<div class="hidden xl:block relative top-0 left-0 w-full h-[35vw] flex-none">
    <div class="max-h-screen overflow-hidden">
        <img draggable="false" alt="Backdrop" src={backdrop} class="w-full h-full">
    </div>
    <div 
        class="max-w-[30%] absolute bottom-0 left-0 p-10 z-10 flex flex-col gap-5 w-1/2 [text-shadow:_2px_2px_4px_rgba(0,0,0,.45);]"   
    >
        <p class="text-2xl font-bold">Avatar: The Way of Water</p>
        <p class="text-lg">Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.</p>
        <div class="flex gap-5">
            <button class="hover:opacity-90 text-xl bg-slate-700 py-2 px-6 rounded-sm font-semibold">Play</button>
            <button class="hover:opacity-90 text-xl bg-slate-700 py-2 px-6 rounded-sm font-semibold">More Info</button>
        </div>
    </div>
</div>
<div class="relative z-20 flex-grow bg-slate-900 xl:bg-inherit xl:bg-gradient-to-t from-slate-900/100 from-[90%] to-slate-900/0 to-100%">
    <div class="flex flex-col gap-10 my-14">
        {#each data.rows as row}
            <MediaRow title={row.title} items={row.items} />
        {/each}
    </div>
</div>