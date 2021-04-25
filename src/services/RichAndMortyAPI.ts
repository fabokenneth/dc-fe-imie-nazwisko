import {
  Character,
  CharactersTypes,
  ResponseData,
  RequestData,
} from '../types/CharactersType.interface'

export const getCharacters = async (
  currentPage: number,
  request: RequestData
): Promise<CharactersTypes> => {
  const result: ResponseData = await fetch(
    'https://rickandmortyapi.com/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query:
          `query {
                        characters(page:` +
          currentPage +
          `, filter: { ` +
          request.searchType +
          `:"` +
          request.searchText +
          `" }) {
                            info {
                              count,
                              pages
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
    }
  ).then((res) => res.json())
  return result.data.characters
}

export const fetchByIds = async (ids: number[]): Promise<Character[]> => {
  if (ids && ids.length > 0) {
    const result: ResponseData = await fetch(
      'https://rickandmortyapi.com/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query:
            `query {
                            charactersByIds( ids:[` +
            ids +
            `]) {
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
                            }`,
        }),
      }
    ).then((res) => res.json())
    return result.data.charactersByIds
  }
  return []
}

export const fetchById = async (id: number): Promise<Character> => {
  const result: ResponseData = await fetch(
    'https://rickandmortyapi.com/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query:
          `query {
                            character( id:` +
          id +
          `) {
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
                            }`,
      }),
    }
  ).then((res) => res.json())
  return result.data.character
}
