import { useCypressCommands } from './utils/common'
const { searchByCriteria, getCharactersList } = useCypressCommands()

describe('Search', () => {
  it('No Filter', () => {
    searchByCriteria('', '')
    const charactersAreaList = getCharactersList()
    charactersAreaList
      .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
      .assertHasEntry('2', 'Morty Smith', 'Male', 'Human', 'S04E10')
      .assertHasEntry('3', 'Summer Smith', 'Female', 'Human', 'S04E10')
  })

  // it('By Name', () => {
  //   searchByCriteria('Name', 'Rich{enter}')
  //   const charactersAreaList = goToCharactersAreaList()
  //   charactersAreaList
  //     .assertHasEntry('1', 'Rick Sanchez', 'Male', 'Human', 'S04E10')
  //     .assertHasEntry('2', 'Morty Smith', 'Male', 'Human', 'S04E10')
  //     .assertHasEntry('3', 'Summer Smith', 'Female', 'Human', 'S04E10')
  // })
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
