<script>
    import Header from "./Header.svelte";
</script>

<div class="w-full h-full">
    <Header />
    <div class="w-full h-full">
        <slot />
    </div>
</div>