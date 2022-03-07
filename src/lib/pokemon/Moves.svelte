<script lang="ts">
	import type { IMoves } from 'src/types/types';
	import { getPokemonName } from 'src/utils/pokemon';

	export let moves: IMoves[];

	function sortByName(name1: string, name2: string) {
		if (name1 < name2) {
			return -1;
		}
		if (name1 > name2) {
			return 1;
		}
		return 0;
	}

	const levelMoves = moves
		.filter((m) => m.move_learn_method.id === 1)
		.sort((a, b) => a.level_learned_at - b.level_learned_at);
	const breedingMoves = moves
		.filter((m) => m.move_learn_method.id === 2)
		.sort((a, b) =>
			sortByName(getPokemonName(a.move.names, 'fr'), getPokemonName(b.move.names, 'fr'))
		);
	const npcMoves = moves
		.filter((m) => m.move_learn_method.id === 3)
		.sort((a, b) =>
			sortByName(getPokemonName(a.move.names, 'fr'), getPokemonName(b.move.names, 'fr'))
		);
	const ctMoves = moves
		.filter((m) => m.move_learn_method.id === 4)
		.sort((a, b) =>
			sortByName(getPokemonName(a.move.names, 'fr'), getPokemonName(b.move.names, 'fr'))
		);
	const formChangeMoves = moves
		.filter((m) => m.move_learn_method.id === 10)
		.sort((a, b) =>
			sortByName(getPokemonName(a.move.names, 'fr'), getPokemonName(b.move.names, 'fr'))
		);
</script>

<h3>Apprises par montée de niveau</h3>
<div class="moves-level">
	<div class="move-level th">
		<div class="name">
			<span>Attaque</span>
		</div>
		<div class="level">Niveau</div>
		<div class="type">Type</div>
	</div>
	{#each levelMoves as move}
		<div class="move-level">
			<div class="name">
				<span>{getPokemonName(move.move.names, 'fr')}</span>
			</div>
			<div class="level">
				{move.level_learned_at}
			</div>
			<div class="type">
				{move.move.type.name}
			</div>
		</div>
	{/each}
</div>

<h3>Apprises par CT/CS</h3>
<div class="moves-ct">
	<div class="move-ct th">
		<div class="name">
			<span>Attaque</span>
		</div>
		<div class="type">Type</div>
	</div>
	{#each ctMoves as move}
		<div class="move-ct">
			<div class="name">
				<span>{getPokemonName(move.move.names, 'fr')}</span>
			</div>
			<div class="type">
				{move.move.type.name}
			</div>
		</div>
	{/each}
</div>

<h3>Apprises par un tiers</h3>
<div class="moves-ct">
	<div class="move-ct th">
		<div class="name">
			<span>Attaque</span>
		</div>
		<div class="type">Type</div>
	</div>
	{#each npcMoves as move}
		<div class="move-ct">
			<div class="name">
				<span>{getPokemonName(move.move.names, 'fr')}</span>
			</div>
			<div class="type">
				{move.move.type.name}
			</div>
		</div>
	{/each}
</div>

<h3>Apprises par reproduction</h3>
<div class="moves-ct">
	<div class="move-ct th">
		<div class="name">
			<span>Attaque</span>
		</div>
		<div class="type">Type</div>
	</div>
	{#each breedingMoves as move}
		<div class="move-ct">
			<div class="name">
				<span>{getPokemonName(move.move.names, 'fr')}</span>
			</div>
			<div class="type">
				{move.move.type.name}
			</div>
		</div>
	{/each}
</div>

{#if formChangeMoves.length}
	<h3>Apprises par évolution</h3>
	<div class="moves-ct">
		<div class="move-ct th">
			<div class="name">
				<span>Attaque</span>
			</div>
			<div class="type">Type</div>
		</div>
		{#each formChangeMoves as move}
			<div class="move-ct">
				<div class="name">
					<span>{getPokemonName(move.move.names, 'fr')}</span>
				</div>
				<div class="type">
					{move.move.type.name}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.move-level {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: space-between;
		padding: 6px 0;

		&.th {
			font-weight: bold;
			margin-bottom: 8px;
			padding-bottom: 8px;
			border-bottom: 1px solid #ccc;
		}
		.level {
			text-align: center;
		}
	}

	.move-ct {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: space-between;
		padding: 6px 0;

		&.th {
			font-weight: bold;
			margin-bottom: 8px;
			padding-bottom: 8px;
			border-bottom: 1px solid #ccc;
		}
	}
</style>
