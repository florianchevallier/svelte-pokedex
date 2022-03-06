<script lang="ts">
	import type { IPokemon, IPokemonSpecies } from 'pokeapi-typescript';
	export let srcPokeball = '/assets/pokeball.svg';
	import Evolution from 'src/components/Evolution.svelte';
	import Icon from 'src/components/Icon.svelte';
	import type { IChains } from 'src/types/types';
	import { getPokemonName } from 'src/utils/pokemon';
	export let chains: IChains[];
	export let varietties: IPokemon[];
	export let pokemonSpecie: IPokemonSpecies;

	const BASE_IMAGE_URL =
		'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/';
</script>

<div class="evolutions">
	{#each chains as chain}
		<Evolution {chain} />
	{/each}

	{#if varietties.length > 0}
		<h3>Evolutions spéciales</h3>
		{#each varietties as varietty}
			<div class="evolution">
				<a class="from" href="/pokedex/pokemon/{pokemonSpecie.id}">
					<img class="pokeball" src={srcPokeball} alt="Pokeball" />
					<img
						src="{BASE_IMAGE_URL}{pokemonSpecie.id}.png?raw=true"
						class="pokemon"
						alt={getPokemonName(pokemonSpecie.names, 'fr')}
					/>
					<span class="name">{getPokemonName(pokemonSpecie.names, 'fr')}</span>
				</a>
				<span class="method">
					<Icon name="arrow-right" />
					{#if varietty.forms[0].name.includes('mega')}
						<span>Avec une pierre de méga-évolution</span>
					{/if}
					{#if varietty.forms[0].name.includes('gmax')}
						<span
							>Pour certains {getPokemonName(pokemonSpecie.names, 'fr')} en combat, pendant 3 tours</span
						>
					{/if}
				</span>
				<a class="to" href="/pokedex/pokemon/{varietty.id}">
					<img class="pokeball" src={srcPokeball} alt="Pokeball" />
					<img
						src="{BASE_IMAGE_URL}{varietty.id}.png?raw=true"
						class="pokemon"
						alt={varietty.name}
					/>
					<span class="name">{varietty.name}</span>
				</a>
			</div>
		{/each}
	{/if}

	{#if chains.length === 0 && varietties.length === 0}
		<p>Aucune évolution connue</p>
	{/if}
</div>

<style lang="scss">
	.evolutions {
		display: flex;
		flex-direction: column;
		row-gap: 28px;
	}

	a {
		color: black;
		text-decoration: none;
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
			padding: 0 20px;
			text-align: center;
			width: 100%;
		}
	}

	p {
		text-align: center;
	}
</style>
