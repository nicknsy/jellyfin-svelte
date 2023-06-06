<script lang="ts">
	import type { PageData } from "./$types";

	import VideoPlayer from '@/components/VideoPlayer.svelte';

	export let data: PageData;
</script>

<VideoPlayer assetUri={data.assetUri} />