import type { IName, IFlavorText, IType, INamedApiResource, ITypeRelations } from "pokeapi-typescript";
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

  return {
    specie, eggGroups, pokemonTypes, general, pokemonStats, damagesInfos
  }
}