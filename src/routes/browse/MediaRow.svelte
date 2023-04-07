<script lang="ts">
    export let label: string;
</script>

<div class="m-14 w-full">
    <h2 class="text-2xl font-semibold">{label}</h2>
    <div class="flex flex-row gap-5 w-full mt-5">
        {#each {length: 8} as _, i}
            <div class="inline-block md w-[10%] h-[16vw] bg-gray-600/80 rounded-md bg-[url('/src/lib/assets/poster.jpg')] bg-cover">
            </div>
        {/each}
    </div>
</div>