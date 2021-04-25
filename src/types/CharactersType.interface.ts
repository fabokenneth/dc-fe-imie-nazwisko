export interface ResponseData {
  data: Characters & CharactersByIds
}

export interface CharactersByIds {
  charactersByIds: Character[],
}

export interface Characters {
  characters: CharactersTypes,
}
export interface CharactersTypes {
  info: Info
  results: Character[]
}

export interface Info {
  count: number,
  pages: number
}

export interface Episode {
  id: number
  air_date: string
  episode: string
}

export enum Gender {
  Male= "Male",
  Female= "Female",
  unknown= "unknown",
  Genderless= "Genderless"
}

export interface Character {
  id: number
  name: string
  species: string
  gender: Gender
  image: string
  episode: Episode[]
}
