describe('Favorite Charaters', () => {
  it('Select favorite characters and check favorite tab ', () => {
    cy.visit('/')
    cy.contains('h1', 'Hello Vue 3 + TypeScript + Vite')
  })
})
