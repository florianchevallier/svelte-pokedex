<script type="ts">
	import PokemonCard from '$lib/home/PokemonCard.svelte';
	import type { IPokemon, IPokemonSpecies } from 'pokeapi-typescript';
	import Header from 'src/components/Header.svelte';
	import request from 'src/utils/request';
	import { onMount } from 'svelte';

	let limit = 20;
	let offset = 0;
	let loading = true;
	let pokemonSpecies: IPokemonSpecies[] = [];
	let pokemons: IPokemon[] = [];

	const getPokemonList = async () => {
		loading = true;
		const response = await request<{ species: IPokemonSpecies[]; newPokemons: IPokemon[] }>(
			'/api/pokedex?limit=' + limit + '&offset=' + offset
		);
		pokemonSpecies = [...pokemonSpecies, ...response.species];
		pokemons = [...pokemons, ...response.newPokemons];
		loading = false;
	};

	async function handleOnScroll() {
		const scrollTop = document.documentElement.scrollTop;
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		const scrolledTop = scrollTop + clientHeight + 175;
		const bottom = scrollHeight - 20;
		if (scrolledTop >= bottom && !loading) {
			offset += limit;
			getPokemonList();
		}
	}

	onMount(() => {
		getPokemonList();
	});
</script>

<svelte:window on:scroll={handleOnScroll} />

<div class="page">
	<Header />
	<section id="pokedex" class="pokedex">
		<h1>Pokédex</h1>

		<div class="pokemon-list">
			{#each pokemonSpecies as specie, i}
				<PokemonCard pokemonSpecie={specie} pokemon={pokemons[i]} />
			{/each}
			{#if loading}
				<div class="loading">
					<p>Chargement des pokémons...</p>
				</div>
			{/if}
		</div>
	</section>
</div>

<style type="scss">
	.pokedex {
		padding: 0 $main-h-padding;
	}
	.loading {
		width: 100%;
	}
	.pokemon-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: 1fr;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		margin-top: 40px;
	}
</style>
