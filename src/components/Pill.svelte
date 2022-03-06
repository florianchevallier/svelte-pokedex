<script lang="ts">
	export let name: string;
	export let color: string = '';
	export let size: string = 'm';
</script>

<span class="type {color} size-{size}">{name}</span>

<style lang="scss">
	.type {
		display: block;
		background-color: rgb(255, 255, 255, 0.4);
		border-radius: 38px;
		padding: 6px 4px;
		font-size: 8px;
		color: white;
		font-weight: 400;
		width: fit-content;
		min-width: 34px;
		text-align: center;

		&.white {
			color: gray;
		}

		&.size-xl {
			font-size: 14px;
			padding: 10px 20px;
		}
	}
</style>
