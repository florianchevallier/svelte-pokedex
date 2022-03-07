import flattenDeep from "lodash/flattenDeep.js";
import type { IName, IFlavorText, IType, INamedApiResource, ITypeRelations, IChainLink, IItem, ILocation } from "pokeapi-typescript";
import PokeAPI from "pokeapi-typescript";
import type { NamedEndpointParam } from "pokeapi-typescript/dist/classes/NamedEndpoint";
import type { IDamagesInfos } from "src/types/types";
import request from "./request";
import types from "./static-datas/types";

export function getPokemonName(names: IName[], locale: string): string {
  const name = names.find((n) => n.language.name === locale);
  return name ? name.name : names[0].name;
}
export function getPokemonDescription(flavors: IFlavorText[], locale: string): string {
  const name = flavors.find((n) => n.language.name === locale);
  return name ? name.flavor_text : flavors[0].flavor_text;
}
export function getPokemonType(type: string): string {
  const name = types.find((n) => n.original.toUpperCase() === type.toUpperCase())?.name;
  return capitalizeFirstLetter(name) || '';
}

export function dmTom(dm: number): number {
  return dm / 10;
}
export function dgToKg(dg: number): number {
  return dg / 10;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function getPokemonInfos(id: NamedEndpointParam, language: string) {
  const specie = await PokeAPI.PokemonSpecies.resolve(id);
  const general = await PokeAPI.Pokemon.resolve(id);

  const eggGroups = await Promise.all(
    specie.egg_groups.map(async (eggGroup) => {
      const group = await PokeAPI.EggGroup.resolve(eggGroup.name);
      return group.names.find((n) => n.language.name === language).name;
    })
  );

  const pokemonTypes = await Promise.all(
    general.types.map(async (type) => {
      const t = await request<IType>(type.type.url);
      const damageRelations = {};
      await Promise.all(Object.keys(t.damage_relations).map(async k => {
        damageRelations[k] = await Promise.all(t.damage_relations[k].map(async (dr: INamedApiResource<IType>) => {
          const type = await PokeAPI.Type.resolve(dr.name);
          return { ...dr, name: type.names.find((n) => n.language.name === language).name };
        }))
      }))
      return {
        ...t, name: t.names.find((n) => n.language.name === language).name, damage_relations: damageRelations as ITypeRelations
      }
    })
  );

  const pokemonStats = await Promise.all(
    general.stats.map(async (stat) => {
      const s = await PokeAPI.Stat.resolve(stat.stat.name);
      return {
        name: s.names.find((n) => n.language.name === language).name,
        value: stat.base_stat,
      };
    })
  );

  const damagesInfos = getDamagesInfos(pokemonTypes);

  const evolutionChains = await PokeAPI.EvolutionChain.resolve(+specie.evolution_chain.url.split('/').slice(-2)[0]);

  const varietties = await Promise.all(
    specie.varieties.filter(v => v.is_default === false).map(async (variety) => {
      const v = await PokeAPI.Pokemon.resolve(variety.pokemon.name);
      const form = await PokeAPI.PokemonForm.resolve(variety.pokemon.name);
      return {
        ...v,
        name: (v.name.includes('mega') ? getPokemonName(form.names, 'fr') : `${getPokemonName(specie.names, 'fr')} Gigamax`),
      };
    })
  );

  // On fait le premier maillon
  const chains = await getEvolutionDetails(evolutionChains.chain.species.name, evolutionChains.chain.evolves_to);

  const moves = await Promise.all(
    general.moves.map(async (move) => {
      const m = await PokeAPI.Move.resolve(move.move.name);
      const versionDetailGroup = await Promise.all(
        move.version_group_details.map(async (vd) => {
          const moveLearnMethod = await PokeAPI.MoveLearnMethod.resolve(vd.move_learn_method.name);
          return {
            ...vd,
            move_learn_method: {
              ...moveLearnMethod,
              name: moveLearnMethod.names.find((n) => n.language.name === 'fr')?.name || moveLearnMethod.names.find((n) => n.language.name === 'en')?.name,
            }
          };
        }));
      return {
        ...move,
        version_group_details: versionDetailGroup
      };
    })
  );

  // Tri parmis les move, car c'est bien trop fourni par rapport à ce dont on a besoin.
  const finalMoves = await Promise.all(moves.map(async m => {

    const moveFull = await PokeAPI.Move.resolve(m.move.name);
    const versionGroup = m.version_group_details[m.version_group_details.length - 1];
    const versionGroupFinal = await PokeAPI.VerionGroup.resolve(versionGroup.version_group.name);

    return {
      move: moveFull,
      version_group: versionGroupFinal,
      move_learn_method: versionGroup.move_learn_method,
      level_learned_at: versionGroup.level_learned_at
    }
  }));

  console.log('finalMoves', finalMoves);

  return {
    specie,
    eggGroups,
    pokemonTypes,
    general,
    pokemonStats,
    damagesInfos,
    evolutionChains,
    chains: flattenDeep(chains),
    varietties,
    moves: finalMoves
  }
}

function getDamagesInfos(pokemonTypes: IType[]) {
  const sensitivities = pokemonTypes.reduce((prev, curr) => {
    curr.damage_relations.half_damage_from.forEach((t) => {
      prev[t.name] = prev[t.name] ? prev[t.name] * 0.5 : 0.5;
    });
    curr.damage_relations.double_damage_from.forEach((t) => {
      prev[t.name] = prev[t.name] ? prev[t.name] * 2 : 2;
    });
    curr.damage_relations.no_damage_from.forEach((t) => {
      prev[t.name] = prev[t.name] ? prev[t.name] * 0 : 0;
    });
    return prev;
  }, {});

  const strengths = pokemonTypes.reduce((prev, curr) => {
    curr.damage_relations.half_damage_to.forEach((t) => {
      prev[t.name] = prev[t.name] ? prev[t.name] * 0.5 : 0.5;
    });
    curr.damage_relations.double_damage_to.forEach((t) => {
      prev[t.name] = prev[t.name] ? prev[t.name] * 2 : 2;
    });
    curr.damage_relations.no_damage_to.forEach((t) => {
      prev[t.name] = prev[t.name] ? prev[t.name] * 0 : 0;
    });
    return prev;
  }, {});

  const finalStrenghts = Object.keys(strengths).filter((k) => strengths[k] === 2).reduce((prev, curr) => {
    prev[curr] = strengths[curr];
    return prev;
  }, {});
  const finalSensitivities = Object.keys(sensitivities).filter((k) => sensitivities[k] !== 1 && sensitivities !== 0).reduce((prev, curr) => {
    prev[curr] = sensitivities[curr];
    return prev;
  }, {});

  const immunities = Object.keys(sensitivities).filter((k) => sensitivities[k] === 0).reduce((prev, curr) => {
    prev[curr] = sensitivities[curr];
    return prev;
  }, {});

  const damagesInfos: IDamagesInfos = {
    strengths: finalStrenghts,
    sensitivities: finalSensitivities,
    immunities,
  }

  return damagesInfos;
}

async function getEvolutionDetails(from: string, evolves_to: IChainLink[]) {
  return await Promise.all(evolves_to.map(async (evolution) => {
    const specieFrom = await PokeAPI.PokemonSpecies.resolve(from);
    const specieTo = await PokeAPI.PokemonSpecies.resolve(evolution.species.name);
    let chains = [];
    if (evolution.evolves_to.length > 0) {
      chains = await getEvolutionDetails(evolution.species.name, evolution.evolves_to);
    }
    const evolutionDetails = await Promise.all(evolution.evolution_details.map(async (evolutionDetail) => {
      const evolutionTrigger = await PokeAPI.EvolutionTrigger.resolve(evolutionDetail.trigger.name);
      const evolutionTriggerName = evolutionTrigger.names.find((n) => n.language.name === 'fr').name;

      let evolutionItem: IItem;
      if (evolutionDetail.item) {
        evolutionItem = await PokeAPI.Item.resolve(evolutionDetail.item.name);
      }

      let knownMoveType: IType;
      if (evolutionDetail.known_move_type) {
        knownMoveType = await PokeAPI.Type.resolve(evolutionDetail.known_move_type.name);
      }

      let locations: ILocation;
      if (evolutionDetail.location) {
        locations = await PokeAPI.Location.resolve(evolutionDetail.location.name);
      }


      return {
        ...evolutionDetail,
        trigger: {
          ...evolutionDetail.trigger,
          name: evolutionTriggerName,
        },
        item: evolutionItem ? {
          ...evolutionDetail.item,
          name: evolutionItem.names.find((n) => n.language.name === 'fr').name,
        } : null,
        known_move_type: knownMoveType ? {
          ...evolutionDetail.known_move_type,
          name: knownMoveType.names.find((n) => n.language.name === 'fr').name,
        } : null,
        location: locations ? {
          ...evolutionDetail.location,
          name: locations.names.find((n) => n.language.name === 'fr').name,
        } : null
      };
    }));
    return [{
      specieFrom,
      specieTo,
      evolutionDetails: evolutionDetails
    }, ...chains];
  }));
}