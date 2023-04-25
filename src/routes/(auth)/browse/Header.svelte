<script lang="ts">
    import Icon from '@iconify/svelte';
    import logo from '$lib/assets/logo.png';

    export let links: { [label: string]: string }[];
    export let profileImageUrl: string | undefined;
</script>

<nav class="w-full flex gap-10 justify-between py-5 px-14 items-center fixed top-0 shadow-lg bg-black/50 z-50">
    <div class="flex justify-center items-center gap-6">
        <img alt="Logo" src={logo} class="w-8 mr-4">
        <p class="md:hidden">Browse ⏷</p>
        {#each links as {label, link}}
            <a href={link} class="hover:opacity-80 whitespace-nowrap hidden md:inline">{label}</a>
        {/each}
    </div>
    <div class="flex justify-center items-center gap-6">
        <input placeholder="Titles, people, genres" class="hidden rounded-sm py-1 px-3 bg-slate-600 outline-none">
        <span class="text-2xl"><Icon icon="mdi:magnify" /></span>
        <span class="text-2xl"><Icon icon="mdi:account-group-outline" /></span>
        <div class="rounded-sm w-8 cursor-pointer relative group">
            <img class="w-full rounded-sm" alt="Profile" src={profileImageUrl}>
            <div class="bg-black/80 rounded-sm absolute right-0 my-6 invisible hover:visible group-hover:visible">
                <div class="flex flex-col items-center gap-5 py-5 w-36">
                    <p>
                        Dashboard
                    </p>
                    <p>
                        Settings
                    </p>
                    <p>
                        Log Out
                    </p>
                </div>
            </div>
        </div>
    </div>
</nav>