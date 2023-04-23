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
    export let label: string;

    let scrollContainer: Element;

    let hoverTimeout: number;

    let scrollDirection: WheelDirection = OWheelDirection.None;
    let canScroll: boolean = false;
    let lastScroll: Date;

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

    function handleEnter(event: MouseEvent) {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            canScroll = true;
        }, hoverThreshold);
    }

    function handleLeave(event: MouseEvent) {
        clearTimeout(hoverTimeout);
        canScroll = false;
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

<div class="w-full overflow-hidden">
    <h2 class="text-2xl font-semibold">{label}</h2>
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div class="relative">
        <div on:click={clickLeft} class="absolute top-[50%] left-0 cursor-pointer z-50"><p>[--</p></div>
        <div on:click={clickRight} class="absolute top-[50%] right-0 cursor-pointer z-50"><p>--]</p></div>
        <div 
            bind:this={scrollContainer}
            on:wheel={handleWheel} 
            on:mouseenter={handleEnter}
            on:mouseleave={handleLeave}
            class="flex relative gap-5 w-full mt-5 overflow-x-hidden scroll-auto"
        >
        {#each {length: 20} as _, i}
            <div class="flex-none md w-[10%] bg-gray-600/80 rounded-md">
                <img alt="Media Poster" src={posterImage} class="w-full rounded-md">
            </div>
        {/each}
        </div>
    </div>
</div>