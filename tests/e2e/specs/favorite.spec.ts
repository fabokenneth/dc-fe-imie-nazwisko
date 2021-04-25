import { useCypressCommands } from './utils/common'
const {
  searchByCriteria,
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
  it('By Name', () => {
    cy.visit('/')
    const charactersAreaList = getCharactersList()
    charactersAreaList.markAsFavorite('1').markAsFavorite('3')
    const favoriteCharactersAreaList = goToFavoriteCharactersAreaList()
    favoriteCharactersAreaList
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry('3', 'Summer Smith', 'Female', 'Human', 'S04E10')
    searchByCriteria('Name', 'Rick{enter}')
    favoriteCharactersAreaList.assertHasEntry(
      '1',
      'Rick Sanchez',
      'Male',
      'Human',
      'S04E10'
    )
  })
  it('By Identifier', () => {
    cy.visit('/')
    const charactersAreaList = getCharactersList()
    charactersAreaList.markAsFavorite('1').markAsFavorite('3')
    const favoriteCharactersAreaList = goToFavoriteCharactersAreaList()
    favoriteCharactersAreaList
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry('3', 'Summer Smith', 'Female', 'Human', 'S04E10')
    searchByCriteria('Identifier', '3{enter}')
    favoriteCharactersAreaList.assertHasEntry(
      '3',
      'Summer Smith',
      'Female',
      'Human',
      'S04E10'
    )
  })
  it('By Episode', () => {
    cy.visit('/')
    const charactersAreaList = getCharactersList()
    charactersAreaList.markAsFavorite('1').markAsFavorite('6')
    const favoriteCharactersAreaList = goToFavoriteCharactersAreaList()
    favoriteCharactersAreaList
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry(
        '6',
        'Abadango Cluster Princess',
        'Female',
        'Alien',
        'S03E06'
      )
    searchByCriteria('Episode', 'S03{enter}')
    favoriteCharactersAreaList.assertHasEntry(
      '6',
      'Abadango Cluster Princess',
      'Female',
      'Alien',
      'S03E06'
    )
  })
})
