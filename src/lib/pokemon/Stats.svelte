<script lang="ts">
	import type { IType } from 'pokeapi-typescript';

	import StatBar from 'src/components/StatBar.svelte';
	import type { IDamagesInfos } from 'src/types/types';

	export let stats: { name: string; value: number }[];
	export let color: string;
	export let damagesInfos: IDamagesInfos;

	const immunities = Object.keys(damagesInfos.immunities);
	const veryResistant = Object.keys(damagesInfos.sensitivities).filter(
		(s) => damagesInfos.sensitivities[s] === 0.25
	);
	const resistant = Object.keys(damagesInfos.sensitivities).filter(
		(s) => damagesInfos.sensitivities[s] === 0.5
	);
	const vulnerable = Object.keys(damagesInfos.sensitivities).filter(
		(s) => damagesInfos.sensitivities[s] === 2
	);
	const veryVulnerable = Object.keys(damagesInfos.sensitivities).filter(
		(s) => damagesInfos.sensitivities[s] === 4
	);
</script>

<div class="stats">
	{#each stats as stat, i}
		<div class="stat">
			<span class="name">{stat.name}</span>
			<span class="value">{stat.value}</span>
			<StatBar {color} value={stat.value} />
		</div>
	{/each}
</div>

<div class="damages-infos">
	<h3>Informations</h3>
	{#if immunities.length}
		<h4>immunisé contre :</h4>
		<div class="types">
			{#each immunities as type}
				<span class="type">{type}</span>
			{/each}
		</div>
	{/if}
	{#if veryResistant.length}
		<h4>très résistant contre :</h4>
		<div class="types">
			{#each veryResistant as type}
				<span class="type">{type}</span>
			{/each}
		</div>
	{/if}
	{#if resistant.length}
		<h4>résistant contre :</h4>
		<div class="types">
			{#each resistant as type}
				<span class="type">{type}</span>
			{/each}
		</div>
	{/if}
	{#if vulnerable.length}
		<h4>vulnerable contre :</h4>
		<div class="types">
			{#each vulnerable as type}
				<span class="type">{type}</span>
			{/each}
		</div>
	{/if}
	{#if veryVulnerable.length}
		<h4>Très vulnérable contre :</h4>
		<div class="types">
			{#each veryVulnerable as type}
				<span class="type">{type}</span>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.stats {
		display: flex;
		flex-direction: column;
		row-gap: 14px;
		font-size: 14px;

		.stat {
			display: flex;
			align-items: center;
			column-gap: 16px;
			.name {
				color: #303943;
				opacity: 0.6;
				flex-basis: 300px;
			}
		}
	}

	.damages-infos {
		h3 {
			margin: 0;
			margin-top: 24px;
		}
		h4 {
			margin: 8px 0;
		}
		.types {
			display: flex;
			column-gap: 12px;
			font-size: 14px;
		}
	}
</style>
