<script lang="ts">
	import type { PageData } from "./$types";

    import MediaRow from '@/components/browse/MediaRow.svelte';

    export let data: PageData;
</script>

<svelte:head>
    <title>Jellyfin - Browse</title>
</svelte:head>

<div class="hidden flex-none relative xl:block">
    <div class="max-h-[35vw]">
        <img draggable="false" alt="Featured Backdrop" src={data.featured.backdropUrl} class="w-full h-full">
    </div>
    <div 
        class="max-w-[30%] absolute bottom-0 left-0 p-10 z-10 flex flex-col gap-5 w-1/2 [text-shadow:_2px_2px_4px_rgba(0,0,0,.45);]"   
    >
        <img draggable="false" alt="Featured Logo" src={data.featured.logoUrl}>
        <!-- <p class="text-2xl font-bold">{data.featured.title}</p> -->
        <p class="text-lg">{data.featured.description}</p>
        <div class="flex gap-5">
            <button class="hover:opacity-90 text-xl bg-slate-700 py-2 px-6 rounded-sm font-semibold">Play</button>
            <button class="hover:opacity-90 text-xl bg-slate-700 py-2 px-6 rounded-sm font-semibold">More Info</button>
        </div>
    </div>
</div>
<div class="hidden xl:block relative z-20 w-full h-20 flex-none bg-gradient-to-t from-slate-950/100 to-black/0 to-100% via-black/50 via-60%">

</div>
<div class="relative py-5 flex-grow bg-gradient-to-b z-20 from-slate-950 via-slate-900 to-slate-950">
    <div class="flex flex-col gap-10 my-14">
        {#each data.rows as row}
            <MediaRow title={row.title} items={row.items} />
            <MediaRow title={row.title} items={row.items} />
            <MediaRow title={row.title} items={row.items} />
        {/each}
    </div>
</div>