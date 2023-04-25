<script lang="ts">
    import MediaRow from './MediaRow.svelte';
    import backdrop from '$lib/assets/backdrop.webp';
</script>

<svelte:head>
    <title>Jellyfin - Browse</title>
</svelte:head>

<div class="relative top-0 left-0 w-full max-h-[35vw]">
    <div class="max-h-screen overflow-hidden">
        <img alt="Backdrop" src={backdrop} class="w-full">
    </div>
    <div 
        class="absolute bottom-0 left-0 px-14 py-10 z-10 flex flex-col gap-5 w-2/5 [text-shadow:_2px_2px_4px_rgba(0,0,0,.45);]"   
    >
        <p class="xl:text-3xl font-bold">Avatar: The Way of Water</p>
        <p class="hidden xl:block text-lg">Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.</p>
        <div class="flex gap-5">
            <button class="hover:opacity-80 text-xl bg-sky-500 py-2 px-6 rounded-sm font-semibold">Play</button>
            <button class="hover:opacity-80 text-xl bg-sky-500 py-2 px-6 rounded-sm font-semibold">More Info</button>
        </div>
    </div>
</div>
<div class="relative z-20 flex-grow bg-gradient-to-t from-gray-950/100 from-[85%] to-gray-950/0 to-100%">
    <div class="flex flex-col gap-5 p-14">
        <MediaRow label="Keep Watching" />
        <MediaRow label="New Movies" />
        <MediaRow label="Thrilling" />
        <MediaRow label="Anime" />
        <MediaRow label="Foreign Films" />
    </div>
</div>