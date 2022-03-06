<script lang="ts">
	import type { IPokemon, IPokemonSpecies } from 'pokeapi-typescript';
	import Pill from 'src/components/Pill.svelte';
	import { getPokemonName, getPokemonType } from 'src/utils/pokemon';
	export let pokemonSpecie: IPokemonSpecies;
	export let pokemon: IPokemon;
	let pokesmall = '/assets/pokesmall.svg';
</script>

<a href="/pokedex/pokemon/{pokemonSpecie.id}">
	<div class="pokemon-card {pokemonSpecie.color.name} pkcolor-bg-{pokemonSpecie.color.name}">
		<img
			class="pokemon-img"
			alt={pokemonSpecie.name}
			src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/{pokemonSpecie.id}.png?raw=true"
		/>
		<img class="pokesmall" alt="pokeball decoration" src={pokesmall} />
		<span class="number">{`#${pokemonSpecie.id.toString().padStart(3, '0')}`}</span>
		<div class="name-type">
			<span class="name">{getPokemonName(pokemonSpecie.names, 'fr')}</span>
			{#each pokemon.types as type}
				<Pill name={getPokemonType(type.type.name)} color={pokemonSpecie.color.name} />
			{/each}
		</div>
	</div>
</a>

<style lang="scss">
	a {
		display: block;
		text-decoration: none;
		color: inherit;
	}
	.number {
		position: absolute;
		top: 5px;
		right: 10px;
		opacity: 0.15;
		font-size: 14px;
		font-weight: bold;
	}
	.pokemon-card {
		display: flex;
		flex-direction: column;
		border-radius: 20px;
		position: relative;
		padding: 24px 16px;
		height: 60px;
		z-index: 2;
		box-shadow: 0px 8px 15px rgba(48, 57, 67, 0.12);
		overflow: hidden;

		.name-type {
			display: flex;
			flex-direction: column;
			row-gap: 4px;

			.name {
				font-weight: bold;
				color: white;
				font-size: 14px;
				margin-bottom: 4px;
			}
		}

		&.white {
			.name {
				color: black;
			}
		}

		.pokesmall {
			position: absolute;
			right: -2px;
			bottom: -16px;
			z-index: 1;
		}

		.pokemon-img {
			position: absolute;
			bottom: 0;
			right: 10px;
			max-width: 65px;
			z-index: 3;
		}
	}
</style>
