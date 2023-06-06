<script lang="ts">
    import type { LayoutData } from './$types';
    import Header from "@/components/common/Header.svelte";

    export let data: LayoutData;

    // Construct nav links from user views items
    let navLinks = [{ label: 'Home', link: '/browse' }];
    data.views?.forEach(item => 
        item.Name && item.Id && navLinks.push({ label: item.Name, link: `/browse/library/${item.Id}` }));
</script>

<div class="flex flex-col w-full h-full">
    <Header links={navLinks} profileImageUrl={data.profileImage} />
    <div class="xl:hidden w-full h-24 flex-none bg-slate-950"></div>
    <slot />
</div>