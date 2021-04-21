import { ResponseData } from '../types/CharactersType.interface'

export const getCharacters = async (): Promise<ResponseData> =>
  await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
  characters(page: 1, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      id,
      name,
      species,
      gender,
      image
    }
  }
}`,
    }),
  }).then((res) => res.json())
