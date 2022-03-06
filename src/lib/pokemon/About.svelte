<script lang="ts">
	import type { IPokemon, IPokemonSpecies } from 'pokeapi-typescript';
	import { dgToKg, dmTom, getPokemonDescription } from 'src/utils/pokemon';
	export let pokemon: IPokemon;
	export let pokemonSpecie: IPokemonSpecies;
	export let eggGroups: string[];

	let urlMale = '/assets/male.svg';
	let urlFemale = '/assets/female.svg';
</script>

<p class="description">{getPokemonDescription(pokemonSpecie.flavor_text_entries, 'fr')}</p>

<div class="size">
	<div class="height">
		<span class="label">Taille</span>
		<span class="value">{dmTom(pokemon.height).toFixed(2)} m</span>
	</div>
	<div class="weight">
		<span class="label">Poids</span>
		<span class="value">{dgToKg(pokemon.weight).toFixed(2)} kg</span>
	</div>
</div>

<div class="breeding">
	<h4>Elevage</h4>
	<div class="table">
		<div class="col">
			<div class="cell title">Genre</div>
			<div class="cell title">Groupe d'œuf</div>
			<div class="cell title">Cycle</div>
		</div>
		<div class="col">
			<div class="cell">
				<img src={urlMale} alt="male" />
				{100 - (pokemonSpecie.gender_rate / 8) * 100}%
				<img class="female" src={urlFemale} alt="female" />
				{(pokemonSpecie.gender_rate / 8) * 100}%
			</div>
			<div class="cell">{eggGroups.join(', ')}</div>
			<div class="cell">{255 * (pokemonSpecie.hatch_counter + 1)} pas avant éclosion</div>
		</div>
	</div>
</div>

<style lang="scss">
	.description {
		font-weight: 400;
		font-size: 14px;
		line-height: 24px;
	}
	.size {
		display: flex;
		justify-content: space-between;
		max-width: 200px;
		padding: 20px 16px;
		background: #ffffff;
		box-shadow: 0px 8px 23px rgba(0, 0, 0, 0.12);
		border-radius: 12px;
		margin: 0 auto;
		margin-top: 30px;
		margin-bottom: 30px;

		.height,
		.weight {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 1;
			.label {
				font-weight: 700;
				font-size: 14px;
				line-height: 28px;
				color: #303943;
				opacity: 0.4;
			}
			.value {
				font-weight: 400;
				font-size: 14px;
				line-height: 24px;
			}
		}
	}
	.breeding {
		margin-top: 30px;
	}
	.table {
		display: flex;
		column-gap: 14px;
		font-size: 14px;
		.col {
			display: flex;
			flex-direction: column;
			row-gap: 12px;
			.cell {
				&.title {
					color: #303943;
					opacity: 0.6;
				}

				.female {
					margin-left: 10px;
				}
			}
		}
	}
</style>
