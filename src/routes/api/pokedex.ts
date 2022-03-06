// Require the package
import PokeAPI from 'pokeapi-typescript';


export async function get(event) {

  const limit = event.url.searchParams.get('limit') || 10;
  const offset = event.url.searchParams.get('offset') || 0;
  const pokemonList = await PokeAPI.PokemonSpecies.list(limit, offset);

  const promisesSpecies = pokemonList.results.map((p) => {
    const pokemonId = p.url.split('/').slice(-2)[0];
    return PokeAPI.PokemonSpecies.resolve(pokemonId);
  });
  const promisesPokemon = pokemonList.results.map((p) => {
    const pokemonId = p.url.split('/').slice(-2)[0];
    return PokeAPI.Pokemon.resolve(pokemonId);
  });
  const species = await Promise.all(promisesSpecies);
  const newPokemons = await Promise.all(promisesPokemon);

  if (newPokemons && species) {
    return {
      body: {
        species,
        newPokemons
      }
    };
  }

  return {
    status: 404
  };
};