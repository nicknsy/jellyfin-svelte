<script>
    import Header from "./Header.svelte";
</script>

<div class="flex w-full h-full flex-col">
    <Header />
    <div class="w-full h-full">
        <slot />
    </div>
</div>