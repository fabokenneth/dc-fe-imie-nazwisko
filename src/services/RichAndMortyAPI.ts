import axios from 'axios'
import {
  Character,
  CharactersTypes,
  ResponseData,
  RequestData,
  Characters,
} from '../types/CharactersType.interface'

const endpoint = 'https://rickandmortyapi.com/graphql'
export const getCharacters = async (
  currentPage: number,
  request: RequestData
): Promise<CharactersTypes> => {
  const response = await axios.post<ResponseData>(endpoint, {
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
  })
  return response.data.data.characters
}

export const fetchByIds = async (ids: number[]): Promise<Character[]> => {
  if (ids && ids.length > 0) {
    const response = await axios.post<ResponseData>(endpoint, {
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
    })
    return response.data.data.charactersByIds
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
