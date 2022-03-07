import type { IEvolutionDetail, IMove, IMoveLearnMethod, IPokemonSpecies, IVersionGroup } from "pokeapi-typescript"

export interface IArticle {
  title: string,
  link: string,
  image: string,
  source: string,
  time: string,
  related: IArticle[]
}

export interface IDamagesInfos {
  strengths: { [key: string]: number },
  sensitivities: { [key: string]: number }
  immunities: { [key: string]: number },
}

export interface IChains {
  specieFrom: IPokemonSpecies,
  specieTo: IPokemonSpecies,
  evolutionDetails: IEvolutionDetail[]
}

export interface IMoves {
  move: IMove,
  version_group: IVersionGroup,
  move_learn_method: IMoveLearnMethod,
  level_learned_at: number
}