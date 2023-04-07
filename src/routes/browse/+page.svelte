<script lang="ts">
    import MediaRow from './MediaRow.svelte';
    import backdrop from '$lib/assets/backdrop.webp';
</script>

<div class="relative w-full h-[40vw]">
    <img alt="Backdrop" src={backdrop} class="absolute top-0 left-0 w-full -z-10">
    <div class="absolute bottom-0 left-0 px-14 py-10 z-10 flex flex-col gap-5 w-2/5">
        <p class="text-3xl font-bold">Avatar: The Way of Water</p>
        <p class="text-lg">Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.</p>
        <div class="flex gap-5">
            <button class="hover:opacity-80 text-xl bg-sky-500 py-2 px-6 rounded-sm font-semibold">Play</button>
            <button class="hover:opacity-80 text-xl bg-sky-500 py-2 px-6 rounded-sm font-semibold">More Info</button>
        </div>
    </div>
</div>
<div class="w-full h-96 bg-gradient-to-t from-slate-900/100 from-[55%] to-slate-900/0 to-100% ">
    <MediaRow label="Keep Watching" />
    <MediaRow label="New Movies" />
    <MediaRow label="Thrilling" />
    <MediaRow label="Anime" />
    <MediaRow label="Foreign Films" />
</div>