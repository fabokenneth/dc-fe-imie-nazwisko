import { useCypressCommands } from './utils/common'
const {
  getCharactersList,
  goToFavoriteCharactersAreaList,
} = useCypressCommands()

describe('Favorite Charaters', () => {
  it('Select favorite characters and check favorite tab ', () => {
    cy.visit('/')
    const charactersAreaList = getCharactersList()
    charactersAreaList.markAsFavorite('1').markAsFavorite('3')
    const favoriteCharactersAreaList = goToFavoriteCharactersAreaList()
    favoriteCharactersAreaList
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry('3', 'Summer Smith', 'Female', 'Human', 'S04E10')
  })
})
