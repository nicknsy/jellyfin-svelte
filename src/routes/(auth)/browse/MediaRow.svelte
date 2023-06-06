<script lang="ts" context="module">
    import posterImage from '$lib/assets/poster.jpg';

    const moveThreshold = 2;   // ratio of abs(deltaX/deltaY) that must be met to start scroll, can't be 0
    const scrollingThreshold = 100; // time in ms between last scroll to be considered no longer scrolling
    const hoverThreshold = 0; // time in ms mouse must be over before scroll is allowed
    const scrollScale = 0.5; // scale scroll amount

    const OWheelDirection = {
        None: 0,
        Vertical: 1,
        Horizontal: 2,
    } as const;
    type WheelDirection = typeof OWheelDirection[keyof typeof OWheelDirection];
</script>

<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { BaseItemDto } from '@jellyfin/sdk/lib/generated-client';

    export let title: string;
    export let items: BaseItemDto[];

    let scrollContainer: Element;

    let hoverTimeout: number;

    let scrollDirection: WheelDirection = OWheelDirection.None;
    let canScroll: boolean = false;
    let lastScroll: Date;
    
    let showLeftButton = false;
    let showRightButton = false;

    // Allow for sideways scroll on trackpad
    function handleWheel(event: WheelEvent) {
        if (!canScroll || event.deltaMode !== WheelEvent.DOM_DELTA_PIXEL) return;

        const lockedScroll = lastScroll && (new Date().getTime() - lastScroll.getTime()) < scrollingThreshold;
        if (!lockedScroll) scrollDirection = OWheelDirection.None;
        
        let deltaX = event.deltaX;
        let deltaY = event.deltaY;

        // Lock scroll to a single direction if threshold is met and not already locked
        if (!lockedScroll) {
            const ratioDeltaXToY = Math.abs(deltaX) / Math.max(1, Math.abs(deltaY));  // avoid div by 0, but...
            if (ratioDeltaXToY >= moveThreshold) {
                scrollDirection = OWheelDirection.Horizontal;
            } else if (deltaY !== 0 && ratioDeltaXToY <= (1 / moveThreshold)) {  // don't lock on vertical if deltaY was actually 0
                scrollDirection = OWheelDirection.Vertical;
            }
        }

        if (scrollDirection === OWheelDirection.None) return;

        lastScroll = new Date();
        if (scrollDirection === OWheelDirection.Horizontal) {
            event.preventDefault();
            scrollContainer.scrollBy(scrollScale * deltaX, 0);
        }
    }

    function updateScrollButtons(event: Event | undefined) {
        showLeftButton = scrollContainer.scrollLeft > 0;
        showRightButton = scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth;
    }

    function handleEnter(event: MouseEvent) {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            canScroll = true;
            updateScrollButtons(undefined);
        }, hoverThreshold);
    }

    function handleLeave(event: MouseEvent) {
        clearTimeout(hoverTimeout);
        canScroll = false;
        showLeftButton = false;
        showRightButton = false;
    }

    function clickLeft(event: MouseEvent) {
        scrollContainer.scrollBy({
            top: 0,
            left: -600,
            behavior: "smooth"
        });
    }

    function clickRight(event: MouseEvent) {
        scrollContainer.scrollBy({
            top: 0,
            left: 600,
            behavior: "smooth"
        });
    }
</script>

<div class="w-full overflow-hidden px-10">
    <h2 class="text-xl font-semibold">{title}</h2>
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div 
        on:wheel={handleWheel} 
        on:mouseenter={handleEnter}
        on:mouseleave={handleLeave}
        class="w-full flex relative"
    >
        <button class:hidden={!showLeftButton} on:click={clickLeft} class="mt-5 absolute left-0 z-20 bg-black/60 h-full lg:w-16 flex justify-center items-center text-5xl"><Icon icon="material-symbols:chevron-left" /></button>
        <button class:hidden={!showRightButton} on:click={clickRight} class="mt-5 absolute right-0 z-20 bg-black/60 h-full lg:w-16 flex justify-center items-center text-5xl"><Icon icon="material-symbols:chevron-right" /></button>
        
        <div 
            bind:this={scrollContainer}
            on:scroll={updateScrollButtons}
            class="flex gap-5 w-full mt-5 overflow-x-hidden scroll-auto"
        >
        {#each items as item}
            <div class="hover:border-white border-2 p-[2px] border-slate-900 flex-none md w-1/3 sm:w-1/5 md:w-1/6 lg:w-56 rounded-sm">
                <a href={`/watch/${item.Id}`}>
                    <img alt="Media Poster" src={`http://jellyfin.local:8096/Items/${item.ParentBackdropItemId ?? item.Id}/Images/Primary`} class="w-full h-full rounded-sm">
                </a>
            </div>
        {/each}
        </div>
    </div>
</div>