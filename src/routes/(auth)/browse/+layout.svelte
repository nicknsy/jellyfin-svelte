<script lang="ts">
    import type { LayoutData } from './$types';
    import Header from "./Header.svelte";

    export let data: LayoutData;

    let navLinks = [{ label: 'Home', link: '/browse' }];
    data.views?.forEach(item => 
        item.Name && item.Id && navLinks.push({ label: item.Name, link: `/browse/library/${item.Id}` }));
</script>

<div class="flex flex-col w-full h-full">
    <Header links={navLinks} profileImageUrl={data.profileImage} />
    <slot />
</div>