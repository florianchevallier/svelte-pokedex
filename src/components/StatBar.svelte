<script lang="ts">
	import { onMount } from 'svelte';

	export let value: number;
	export let color: string;

	let insideBar: HTMLDivElement;
	let progressBar: HTMLDivElement;
	const MAX_BASE_STAT = 255;

	onMount(() => {
		const barWidth = progressBar.clientWidth;
		const statPercent = (value / MAX_BASE_STAT) * 100;
		const insideBarWidth = (statPercent * barWidth) / 100;
		insideBar.style.width = `${insideBarWidth}px`;
	});
</script>

<div bind:this={progressBar} class="progress">
	<div bind:this={insideBar} class="inside-bar pkcolor-bg-{color}" />
</div>

<style lang="scss">
	.progress {
		width: 100%;
		height: 2px;
		background: #f4f5f4;
		opacity: 0.9;
		border-radius: 110px;

		.inside-bar {
			height: 2px;
		}
	}
</style>
