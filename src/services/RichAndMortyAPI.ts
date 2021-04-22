import { ResponseData } from '../types/CharactersType.interface'

export const getCharacters = async (): Promise<ResponseData> =>
  await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
  characters(filter: { }) {
    info {
      count
    }
    results {
      id,
      name,
      species,
      gender,
            image,
      episode {
        id
        episode
        air_date
      }
    }
  }
}`,
    }),
  }).then((res) => res.json())
