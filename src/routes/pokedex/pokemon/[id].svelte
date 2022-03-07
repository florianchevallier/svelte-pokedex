<script lang="ts">
	import type {
		IEvolutionChain,
		IMove,
		IPokemon,
		IPokemonSpecies,
		IType
	} from 'pokeapi-typescript';
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
	import type { IChains, IDamagesInfos, IMoves } from 'src/types/types';
	export let pokemonSpecie: IPokemonSpecies;
	export let pokemon: IPokemon;
	export let pokemonTypes: IType[];
	export let eggGroups: string[];
	export let pokemonStats: { name: string; value: number }[];
	export let damagesInfos: IDamagesInfos;
	export let chains: IChains[];
	export let moves: IMoves[];

	export let varietties: IPokemon[];
	import { getPokemonName } from 'src/utils/pokemon';
	import Header from 'src/components/Header.svelte';
	import About from '$lib/pokemon/About.svelte';
	import Pill from 'src/components/Pill.svelte';
	import Stats from '$lib/pokemon/Stats.svelte';
	import Evolutions from '$lib/pokemon/Evolutions.svelte';
	import Moves from '$lib/pokemon/Moves.svelte';
	const BASE_IMAGE_URL =
		'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/';
</script>

<Header white class="pkcolor-bg-{pokemonSpecie.color.name}" to="/pokedex" />
<div class="page">
	<div class="pokemon-details pkcolor-bg-{pokemonSpecie.color.name}">
		<div class="header">
			<div class="name-number">
				<h1 class="name">{getPokemonName(pokemonSpecie.names, 'fr')}</h1>
				<h2 class="number">#{pokemon.id.toString().padStart(3, '0')}</h2>
			</div>
			<div class="types">
				<div class="pills">
					{#each pokemonTypes as type}
						<Pill size="xl" name={type.name} />
					{/each}
				</div>
				<span class="genus">
					{pokemonSpecie.genera.find((g) => g.language.name === 'fr').genus}
				</span>
			</div>
		</div>
		<div class="cover pkcolor-bg-{pokemonSpecie.color.name}">
			{#if pokemon.id > 1}
				<a href={'/pokedex/pokemon/' + (pokemon.id - 1)}>
					<img
						src="{BASE_IMAGE_URL}{+pokemonSpecie.id - 1}.png?raw=true"
						alt="previous pokemon"
						class="prev"
					/>
				</a>
			{/if}
			<img
				class="current-pokemon"
				alt={getPokemonName(pokemonSpecie.names, 'fr')}
				src="{BASE_IMAGE_URL}{pokemonSpecie.id}.png?raw=true"
			/>
			<a href={'/pokedex/pokemon/' + (pokemon.id + 1)}>
				<img
					src="{BASE_IMAGE_URL}{+pokemonSpecie.id + 1}.png?raw=true"
					alt="next pokemon"
					class="next"
				/>
			</a>
		</div>
		<div class="tabs">
			<TabGroup>
				<TabList class="tab-list">
					<Tab
						class={({ selected }) =>
							selected ? 'pkmn-tab tab-selected' : 'pkmn-tab tab-unselected'}>À propos</Tab
					>
					<Tab
						class={({ selected }) =>
							selected ? 'pkmn-tab tab-selected' : 'pkmn-tab tab-unselected'}>Stats</Tab
					>
					<Tab
						class={({ selected }) =>
							selected ? 'pkmn-tab tab-selected' : 'pkmn-tab tab-unselected'}>Evolutions</Tab
					>
					<Tab
						class={({ selected }) =>
							selected ? 'pkmn-tab tab-selected' : 'pkmn-tab tab-unselected'}>Attaques</Tab
					>
				</TabList>
				<TabPanels>
					<TabPanel><About {pokemon} {pokemonSpecie} {eggGroups} /></TabPanel>
					<TabPanel>
						<Stats stats={pokemonStats} color={pokemonSpecie.color.name} {damagesInfos} />
					</TabPanel>
					<TabPanel>
						<Evolutions {pokemonSpecie} {varietties} {chains} />
					</TabPanel>
					<TabPanel><Moves {moves} /></TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	</div>
</div>

<style lang="scss">
	.page {
		top: -22px;
	}

	.pokemon-details {
		overflow: hidden;
	}
	.header {
		padding: 0 $main-h-padding;
		.name-number {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 10px;
			.name {
				font-family: 'CircularStd-Bold';
				font-weight: 900;
				color: white;
				font-size: 36px;
				margin: 0;
			}
			.number {
				font-weight: 900;
				font-size: 18px;
				line-height: 23px;
				display: flex;
				align-items: center;
				text-align: right;
				color: #ffffff;
			}
		}
		.types {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.pills {
				display: flex;
				column-gap: 12px;
			}
			.genus {
				font-family: 'CircularStd-Book';
				font-weight: 400;
				font-size: 14px;
				line-height: 18px;
				color: #ffffff;
			}
		}
	}
	.cover {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		position: relative;
		border-radius: 20px;

		.prev,
		.next {
			position: absolute;
			max-width: 80px;
			z-index: 2;
			-webkit-filter: grayscale(1) contrast(100) brightness(0);
			filter: grayscale(1) contrast(100) brightness(0);
			mix-blend-mode: multiply;
			opacity: 0.1;
		}
		.current-pokemon {
			max-width: 234px;
			z-index: 3;
		}
		.next {
			right: -20px;
		}
		.prev {
			left: -20px;
		}
	}

	.tabs {
		padding: 20px;
		background-color: white;
		border-top-left-radius: 32px;
		border-top-right-radius: 32px;
		position: relative;
		z-index: 2;
		padding-top: 46px;
		top: -60px;
		margin-bottom: -60px;
	}

	:global(.pkmn-tab) {
		background-color: white;
		border: none;
		padding-bottom: 20px;
		font-size: 14px;
		font-weight: 400;
	}
	:global(.tab-list) {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}
	:global(.tab-selected) {
		border-bottom: 2px solid #6c79db;
	}
	:global(.tab-unselected) {
		color: #303943;
		opacity: 0.4;
	}
</style>
