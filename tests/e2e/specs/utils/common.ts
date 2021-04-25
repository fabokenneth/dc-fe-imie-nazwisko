export function useCypressCommands() {
  function goToCharactersAreaList() {
    cy.get("[data-test-id='characters-area-mn']").click()
    return getCharactersList()
  }

  function goToFavoriteCharactersAreaList() {
    cy.get("[data-test-id='favorite-characters-area-mn']").click()
    return getCharactersList()
  }

  function getCharactersList() {
    return {
      assertHasEntry(
        id: string,
        name: string,
        gender: string,
        species: string,
        lastEpisode: string
      ) {
        cy.get(
          `[data-test-id='characters-area-list'] > tbody > [data-test-id='characterId-${id}']`
        ).within(() => {
          cy.get('td').eq(1).should('contain', id)
          cy.get('td').eq(2).should('contain', name)
          cy.get('td').eq(3).should('contain', gender)
          cy.get('td').eq(4).should('contain', species)
          cy.get('td').eq(5).should('contain', lastEpisode)
        })
        return this
      },
      markAsFavorite(id: string) {
        cy.get(
          `[data-test-id='characters-area-list'] > tbody > [data-test-id='characterId-${id}'] td:nth-child(7) `
        ).click()
        return this
      },
    }
  }

  function searchByCriteria(criteria: string, searchedText: string) {
    if (criteria && searchedText) {
      cy.get("[data-test-id='search-criteria']").click()
      if (criteria === 'Name') {
        cy.get("[data-test-id='item-0']").click()
      } else if (criteria === 'Identifier') {
        cy.get("[data-test-id='item-1']").click()
      } else if (criteria === 'Episode') {
        cy.get("[data-test-id='item-2']").click()
      }
      cy.get("[data-test-id='search-field']").type(searchedText)
    }
  }
  function goToPage(page: string) {
    cy.get("[data-test-id='pagination-page-" + page + "']").click()
    return getCharactersList()
  }
  return {
    goToPage,
    goToCharactersAreaList,
    getCharactersList,
    searchByCriteria,
    goToFavoriteCharactersAreaList,
  }
}
