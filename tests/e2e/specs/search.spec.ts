import { useCypressCommands } from './utils/common'
const { searchByCriteria, getCharactersList, goToPage } = useCypressCommands()

describe('Search', () => {
  it('No Filter', () => {
    cy.visit('/')
    searchByCriteria('', '')
    getCharactersList()
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry('2', 'Morty Smith', 'Male', 'Human', 'S04E10')
      .assertHasEntry('3', 'Summer Smith', 'Female', 'Human', 'S04E10')
  })

  it('No Filter page 4', () => {
    cy.visit('/')
    goToPage('4')
    getCharactersList()
      .assertHasEntry('61', 'Campaign Manager Morty', 'Male', 'Human', 'S03E07')
      .assertHasEntry('62', 'Canklanker Thom', 'Male', 'Alien', 'S01E01')
      .assertHasEntry(
        '63',
        'Centaur',
        'Male',
        'Mythological Creature',
        'S01E02'
      )
      .assertHasEntry('64', 'Chris', 'Unknown', 'Alien', 'S02E01')
  })

  it('By Name', () => {
    cy.visit('/')
    searchByCriteria('Name', 'Rick{enter}')
    getCharactersList()
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry('8', 'Adjudicator Rick', 'Male', 'Human', 'S03E07')
      .assertHasEntry('15', 'Alien Rick', 'Male', 'Alien', 'S01E10')
  })

  it('By Identifier', () => {
    cy.visit('/')
    searchByCriteria('Identifier', '8{enter}')
    getCharactersList().assertHasEntry(
      '8',
      'Adjudicator Rick',
      'Male',
      'Human',
      'S03E07'
    )
  })
})
