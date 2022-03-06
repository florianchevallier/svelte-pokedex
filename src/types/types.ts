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