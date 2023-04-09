<script lang="ts">
    import logo from '$lib/assets/logo.png';
</script>

<nav class="w-full flex justify-between py-5 px-16 items-center fixed top-0 shadow-lg bg-black/50 z-50">
    <div class="flex justify-center items-center gap-5">
        <img alt="Logo" src={logo} class="w-10 mr-5">
        <a href="#">Home</a>
        <a href="#">Movies</a>
        <a href="#">TV Shows</a>
    </div>
    <div>
        <a href="/login">Log Out</a>
    </div>
</nav>