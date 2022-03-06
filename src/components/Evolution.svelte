<script lang="ts">
	import type { IChains } from 'src/types/types';
	import { getPokemonName } from 'src/utils/pokemon';
	import Icon from './Icon.svelte';
	export let chain: IChains;
	export let srcPokeball = '/assets/pokeball.svg';
	const BASE_IMAGE_URL =
		'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/';
</script>

<div class="evolution">
	<a class="from" href="/pokedex/pokemon/{chain.specieFrom.id}">
		<img class="pokeball" src={srcPokeball} alt="Pokeball" />
		<img
			src="{BASE_IMAGE_URL}{chain.specieFrom.id}.png?raw=true"
			class="pokemon"
			alt={getPokemonName(chain.specieFrom.names, 'fr')}
		/>
		<span class="name">{getPokemonName(chain.specieFrom.names, 'fr')}</span>
	</a>
	<span class="method">
		<Icon name="arrow-right" />
		{#each chain.evolutionDetails as evolutionDetail, i}
			<span>{evolutionDetail.trigger.name}</span>

			{#if evolutionDetail.gender}
				<span>{evolutionDetail.gender === 2 ? 'Male' : 'Femelle'}</span>
			{/if}

			{#if evolutionDetail.known_move_type}
				{#if evolutionDetail.min_affection}
					<span
						>Avoir {evolutionDetail.min_affection} + montée de niveau en apprenant une attaque {evolutionDetail
							.known_move_type.name}</span
					>
				{:else if evolutionDetail.min_happiness}
					<span
						>Avoir {evolutionDetail.min_happiness} en Bonheur + montée de niveau en apprenant une attaque
						{evolutionDetail.known_move_type.name}</span
					>
				{/if}
			{:else if evolutionDetail.item}
				<span>{evolutionDetail.item.name}</span>
			{:else if evolutionDetail.time_of_day === 'day'}
				<span>de jour</span>
			{:else if evolutionDetail.time_of_day === 'night'}
				<span>de nuit</span>
			{:else if evolutionDetail.min_level}
				<span>au lvl {evolutionDetail.min_level}</span>
			{:else if evolutionDetail.location}
				<span>à {evolutionDetail.location.name}</span>
			{/if}

			{#if i !== chain.evolutionDetails.length - 1}
				<span>ou</span>
			{/if}
		{/each}
	</span>
	<a class="to" href="/pokedex/pokemon/{chain.specieTo.id}">
		<img class="pokeball" src={srcPokeball} alt="Pokeball" />
		<img
			src="{BASE_IMAGE_URL}{chain.specieTo.id}.png?raw=true"
			class="pokemon"
			alt={getPokemonName(chain.specieTo.names, 'fr')}
		/>
		<span class="name">{getPokemonName(chain.specieTo.names, 'fr')}</span>
	</a>
</div>

<div class="separator" />

<style lang="scss">
	a {
		color: black;
		text-decoration: none;
	}
	.separator {
		height: 1px;
		background-color: #f4f5f4;
	}
	.evolution {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.from,
		.to {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			position: relative;

			.name {
				font-size: 14px;
				margin-top: 8px;
			}

			.pokeball {
				position: absolute;
				top: 0;
				left: 0;
				width: 83px;
			}
			.pokemon {
				width: 83px;
				height: 83px;
			}
		}

		.method {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 8px;
			font-size: 12px;
			padding: 0 8px;
			text-align: center;
		}
	}
</style>
