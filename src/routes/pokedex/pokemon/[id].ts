import { getPokemonInfos } from "src/utils/pokemon";

export async function get({ params }) {
  const pokemonId = +params.id;
  const { specie,
    general,
    eggGroups,
    pokemonTypes,
    pokemonStats,
    damagesInfos,
    chains,
    varietties,
    moves
  } = await getPokemonInfos(pokemonId, params.language || 'fr');

  if (specie) {
    return {
      body: {
        pokemon: general,
        pokemonSpecie: specie,
        eggGroups,
        pokemonTypes,
        pokemonStats,
        damagesInfos,
        chains,
        varietties,
        moves
      }
    };
  }

  return {
    status: 404
  };
};