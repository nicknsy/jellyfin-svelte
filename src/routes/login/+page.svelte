<script lang="ts">
    import { goto } from '$app/navigation';
    import { JellyfinAPI } from '@/stores/jellyfin-api';
    import { CurrentSession } from '@/stores/session';
    import logo from '$lib/assets/logo.png';

    let username: string;
    let password: string;

    async function login() {
        try {
            const { data } = await JellyfinAPI.authenticateUserByName(username, password);
            CurrentSession.updateAuth(data);
            goto('/browse');
        } catch (error) {
            console.error(error);
        }
    }
</script>

<svelte:head>
    <title>Jellyfin - Login</title>
</svelte:head>

<div class="w-full h-full flex items-center justify-center bg-gray-950">
    <form class="flex flex-col justify-center items-center gap-5 p-10 rounded-lg w-full h-full md:h-auto md:w-1/3 min-w-[24rem]">
        <div class="flex w-full justify-center items-center p-10">
            <img alt="Logo" src="{logo}" class="w-16">
            <h1 class="my-auto ml-5 font-thin text-5xl ">Sign In</h1>
        </div>
        <label class="w-full"><input bind:value={username} type="text" autocomplete="username" placeholder="Username" class="rounded-sm p-2 w-full bg-slate-600"></label>
        <label class="w-full"><input bind:value={password} type="password" autocomplete="current-password" placeholder="Password" class="rounded-sm p-2 w-full bg-slate-600"></label>
        <button on:click={login} class="font-semibold w-full bg-sky-500 p-2 rounded-sm">Sign In</button>
    </form>
</div>