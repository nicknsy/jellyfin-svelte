<script>
    import logo from '$lib/assets/logo.png';
</script>

<svelte:head>
    <title>Jellyfin - Login</title>
</svelte:head>

<div class="w-full h-full flex items-center justify-center bg-gray-900">
    <div class="flex flex-col justify-center items-center gap-5 p-10 rounded-lg bg-gray-950/40 w-96 shadow-lg shadow-black">
        <div class="flex w-full justify-center items-center p-5 border-b-2">
            <img alt="Logo" src="{logo}" class="w-16">
            <h1 class="my-auto ml-5 font-semibold text-5xl ">Sign In</h1>
        </div>
        <label class="w-full"><input type="text" placeholder="Username" class="rounded-sm p-2 w-full bg-slate-600"></label>
        <label class="w-full"><input type="password" placeholder="Password" class="rounded-sm p-2 w-full bg-slate-600"></label>
        <a href="/browse" class="w-full"><button class="font-semibold w-full bg-sky-500 p-2 rounded-sm">Sign In</button></a>
    </div>
</div>