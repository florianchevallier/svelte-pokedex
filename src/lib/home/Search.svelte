<script lang="ts">
	import Icon from 'src/components/Icon.svelte';
	let value;
	function handleSubmit() {
		console.log('value', value);
	}
</script>

<form on:submit|preventDefault|stopPropagation={handleSubmit} action="." method="post">
	<div class="input-search">
		<Icon name="search" strokeWidth="3" />
		<input bind:value type="text" name="search" id="search" placeholder="Nom ou numéro" />
	</div>
</form>

<style lang="scss">
	.input-search {
		background: #f5f5f5;
		border-radius: 100px;
		padding: 14px;
		display: flex;
		align-items: center;
		column-gap: 12px;
	}

	input {
		background-color: transparent;
		border: none;
		width: 100%;
		font-size: 14px;
		font-weight: 400;

		&:focus {
			border: none;
			color: $secondary;
			outline: none;
		}
	}
</style>
