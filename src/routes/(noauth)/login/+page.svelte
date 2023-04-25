<script lang="ts">
    import { goto } from '$app/navigation';
    import { JellyfinApi } from '@/stores/jellyfin-api';
    import { CurrentSession } from '@/stores/session';
	import { AxiosError } from 'axios';

    import logo from '$lib/assets/logo.png';

    let username: string;
    let password: string;
    let error: string;

    async function login() {
        try {
            // Username and password input ""sanitization""
            if (!username || !password) {
                error = 'Username or password cannot be blank!';
                return;
            }

            // Update current session auth data and redirect to main page
            const { data } = await JellyfinApi.authenticateUserByName(username, password);
            CurrentSession.updateAuth(data);
            goto('/browse');
        } catch (ex) {
            console.error('Authentication error: ', ex);

            // Show error message on screen if axios response
            if (ex instanceof AxiosError) {
                switch (ex.response?.status) {
                    case 401:
                        error = 'Invalid username or password!';
                        break;
                    default:
                        error = ex.message;
                }
            }
        }
    }
</script>

<svelte:head>
    <title>Jellyfin - Login</title>
</svelte:head>

<div class="w-full h-full flex items-center justify-center bg-slate-900">
    <form class="flex flex-col justify-center items-center gap-5 p-10 rounded-lg w-full h-full md:h-auto md:w-1/3 min-w-[30em]">
        <div class="flex w-full justify-center items-center p-10 gap-5">
            <img alt="Logo" src="{logo}" class="w-20">
            <h1 class="my-auto ml-5 font-thin text-6xl ">Sign In</h1>
        </div>
        <label class="w-full"><input bind:value={username} type="text" autocomplete="username" placeholder="Username" class="rounded-sm p-2 w-full bg-slate-600"></label>
        <label class="w-full"><input bind:value={password} type="password" autocomplete="current-password" placeholder="Password" class="rounded-sm p-2 w-full bg-slate-600"></label>
        <button on:click={login} class="hover:opacity-80 font-semibold w-full bg-sky-500 p-2 rounded-sm">Sign In</button>
        {#if error}
            <div class="w-full text-center rounded-sm bg-red-400/90 border-red-500/90 border p-2 text-red-900">
                {error}
            </div>
        {/if}
    </form>
</div>