const citySelectionQuery = '#city-selection * textarea'

describe('Basic UI: App', () => {
  beforeEach(() => {
    const port = process.env.PORT ? process.env.PORT : '3000'
    cy.visit(`http://localhost:${port}`)
  })

  it('renders the page', () => {
    cy.contains('Lunch voting')
    cy.contains('Results')
    cy.contains('License')
    cy.contains('Search')
    cy.contains('Restaurants by city')

    // should have many windows
    cy.get('.window').its('length').should('be.gte', 3)
  })
  it('clears input when clicking "Clear"', () => {
    // click clear once first
    cy.contains('Clear').click()
    cy.get(citySelectionQuery).should('be.empty')
    // type on clear input and clear it again
    cy.get(citySelectionQuery).type('example, words')
    cy.get(citySelectionQuery).should('not.be.empty')
    cy.get(citySelectionQuery).contains('Example,Words')
    cy.contains('Clear').click()
    cy.get(citySelectionQuery).should('be.empty')
  })
  it('shows one restaurant list', () => {
    cy.contains('Clear').click()
    cy.get(citySelectionQuery).type('espoo')
    // Espoo should have many restaurants
    cy.get('#restaurant-list-Espoo * ul')
      .its('length').should('be.gte', 3)
  })
  it('shows many restaurant lists', () => {
    cy.contains('Clear').click()
    cy.get(citySelectionQuery).type('helsinki,espoo,kuopio')
    cy.get('#restaurant-list-container')
      .children().should('have.length', 3)
  })
  it('closes restaurant lists when clicking the close button', () => {
    cy.contains('Clear').click()
    cy.get(citySelectionQuery).type('helsinki,espoo,kuopio')
    cy.get('#restaurant-list-container')
      .children().should('have.length', 3)
    // all set, close Espoo
    cy.get('#restaurant-list-Espoo .title-bar * button').last().click()
    cy.get('#restaurant-list-container')
      .children().should('have.length', 2)
    cy.get(citySelectionQuery).contains('Helsinki,Kuopio')
    // close Kuopio
    cy.get('#restaurant-list-Kuopio .title-bar * button').last().click()
    cy.get('#restaurant-list-container')
      .children().should('have.length', 1)
    cy.get(citySelectionQuery).contains('Helsinki')
    // close Helsinki
    cy.get('#restaurant-list-Helsinki .title-bar * button').last().click()
    cy.get(citySelectionQuery).should('be.empty')
  })
})
