<script lang="ts">
    import logo from '$lib/assets/logo.png';

    export let links: { [label: string]: string }[];
    export let profileImageUrl: string | undefined;
</script>

<nav class="w-full flex justify-between py-5 px-16 items-center fixed top-0 shadow-lg bg-black/50 z-50">
    <div class="flex justify-center items-center gap-5">
        <img alt="Logo" src={logo} class="w-10 mr-5">
        {#each links as {label, link}}
            <a href={link}>{label}</a>
        {/each}
    </div>
    <div>
        <img alt="Profile" src={profileImageUrl} class="rounded-sm w-10">
    </div>
</nav>