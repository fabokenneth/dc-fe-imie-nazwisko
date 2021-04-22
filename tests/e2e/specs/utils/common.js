export function useCypressCommands() {
  function assertTextIs(value, selector) {
    cy.get(selector)
      .invoke('text')
      .invoke('trim')
      .invoke('replace', /\u00a0/g, ' ')
      .should('eq', value.trim())
  }

  function goToCharactersAreaList() {
    cy.get("[data-test-id='characters-area-mn']").click()
    cy.wait(250)
    return {
      assertHasEntry(id, name, gender, species, lastEpisode) {
        cy.get(
          `[data-test-id='characters-area-list'] > tbody > [data-test-id='${id}']`
        ).within(() => {
          cy.get('td').eq(1).should('contain', id)
          cy.get('td').eq(2).should('contain', name)
          cy.get('td').eq(3).should('contain', gender)
          cy.get('td').eq(4).should('contain', species)
          cy.get('td').eq(5).should('contain', lastEpisode)
        })
        return this
      },
    }
  }

  function searchByCriteria(criteria, searchedText) {
    cy.visit('/')
    cy.get("[data-test-id='search-criteria']").select(criteria)
    cy.get("[data-test-id='search-field']").type(searchedText)
  }

  return {
    assertTextIs,
    goToCharactersAreaList,
    searchByCriteria,
  }
}
