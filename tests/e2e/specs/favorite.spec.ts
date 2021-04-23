import { useCypressCommands } from './utils/common'
const {
  goToCharactersAreaList,
  goToFavoriteCharactersAreaList,
} = useCypressCommands()

describe('Favorite Charaters', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'POST',
        url: '**/graphql',
      },
      (req) => {
        req.reply({
          data: {
            characters: {
              info: {
                count: 84,
                pages: 5,
              },
              results: [
                {
                  id: '1',
                  name: 'Rick Sanchez',
                  gender: 'Male',
                  species: 'Human',
                  episode: [
                    {
                      id: '1',
                      episode: 'S01E01',
                      air_date: 'December 2, 2013',
                    },
                    { id: '2', episode: 'S04E10', air_date: 'May 31, 2020' },
                  ],
                },
                {
                  id: '2',
                  name: 'Adjudicator Rick',
                  gender: 'Male',
                  species: 'Human',
                  episode: [
                    {
                      id: '1',
                      episode: 'S01E01',
                      air_date: 'December 8, 2017',
                    },
                    { id: '2', episode: 'S04E02', air_date: 'June 28, 2020' },
                  ],
                },
                {
                  id: '3',
                  name: 'Alien Rick',
                  gender: 'Female',
                  species: 'Humanoid',
                  episode: [
                    {
                      id: '1',
                      episode: 'S01E01',
                      air_date: 'December 8, 2017',
                    },
                    { id: '2', episode: 'S04E02', air_date: 'June 28, 2020' },
                  ],
                },
                {
                  id: '4',
                  name: 'Antenna Rick',
                  gender: 'Female',
                  species: 'Humanoid',
                  episode: [
                    {
                      id: '1',
                      episode: 'S01E01',
                      air_date: 'December 8, 2017',
                    },
                    { id: '2', episode: 'S04E02', air_date: 'June 28, 2020' },
                  ],
                },
                {
                  id: '5',
                  name: 'Aqua Rick',
                  gender: 'Female',
                  species: 'Humanoid',
                  episode: [
                    {
                      id: '1',
                      episode: 'S01E01',
                      air_date: 'December 8, 2017',
                    },
                    { id: '2', episode: 'S04E02', air_date: 'June 28, 2020' },
                  ],
                },
                {
                  id: '6',
                  name: 'Black Rick',
                  gender: 'Female',
                  species: 'Humanoid',
                  episode: [
                    {
                      id: '1',
                      episode: 'S01E01',
                      air_date: 'December 8, 2017',
                    },
                    { id: '2', episode: 'S04E02', air_date: 'June 28, 2020' },
                  ],
                },
              ],
            },
          },
        })
      }
    ).as('characters')
  })

  it('Select favorite characters and check favorite tab ', () => {
    cy.visit('/')
    const charactersAreaList = goToCharactersAreaList()
    charactersAreaList.markAsFavorite('1').markAsFavorite('3')
    const favoriteCharactersAreaList = goToFavoriteCharactersAreaList()
    favoriteCharactersAreaList
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry('2', 'Adjudicator Rick', 'Male', 'Human', 'S04E02')
      .assertHasEntry('3', 'Alien Rick', 'Female', 'Humanoid', 'S04E02')
  })
})
