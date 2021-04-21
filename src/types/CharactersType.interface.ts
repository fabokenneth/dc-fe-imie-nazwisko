export interface ResponseData {
  data?: Result
}
export interface Result {
  characters?: CharactersTypes
}
export interface CharactersTypes {
  info?: Info
  results?: Character[]
}

export interface Info {
  count: number
}

export interface Character {
  id: number
  name: string
  species: string
  gender: string
  image: string
}
