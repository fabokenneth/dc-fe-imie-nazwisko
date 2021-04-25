import { useCypressCommands } from './utils/common'
const { searchByCriteria, getCharactersList, goToPage } = useCypressCommands()

describe('Search', () => {
  it('No Filter', () => {
    cy.visit('/')
    searchByCriteria('', '')
    const charactersAreaList = getCharactersList()
    charactersAreaList
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry('2', 'Morty Smith', 'Male', 'Human', 'S04E10')
      .assertHasEntry('3', 'Summer Smith', 'Female', 'Human', 'S04E10')
  })

  it('No Filter page 4', () => {
    cy.visit('/')
    goToPage('4')
    const charactersAreaList = getCharactersList()
    charactersAreaList
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
    searchByCriteria('Name', 'Rick{enter}')
    const charactersAreaList = getCharactersList()
    charactersAreaList
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry('8', 'Adjudicator Rick', 'Male', 'Human', 'S03E07')
      .assertHasEntry('15', 'Alien Rick', 'Male', 'Alien', 'S01E10')
  })
  //
  // it('By Identifier', () => {
  //   searchByCriteria('Identifier', '3{enter}')
  //   const charactersAreaList = goToCharactersAreaList()
  //   charactersAreaList.assertHasEntry(
  //     '3',
  //     'Alien Rick',
  //     'Female',
  //     'Humanoid',
  //     'S04E02'
  //   )
  // })
  //
  // it('By Episode', () => {
  //   searchByCriteria('Episode', 'S04E10{enter}')
  //   const charactersAreaList = goToCharactersAreaList()
  //   charactersAreaList.assertHasEntry(
  //     '1',
  //     'Rick Sanchez',
  //     'Male',
  //     'Human',
  //     'S04E10'
  //   )
  // })
})
