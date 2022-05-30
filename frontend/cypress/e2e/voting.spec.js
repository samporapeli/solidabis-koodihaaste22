const citySelectionQuery = '#city-selection * textarea'
const helQuery = '#restaurant-list-Helsinki * .restaurant-tree>li'

describe('Voting: App', () => {
  beforeEach(() => {
    const port = process.env.PORT ? process.env.PORT : '3000'
    cy.visit(`http://localhost:${port}`)
  })

  console.log('\nThis test assumes a fresh backend instance -- please restart backend if tests fail!\n')

  it('shows no votes for today at first', () => {
    cy.contains('Votes: 0')
  })
  it('can give and delete a vote succesfully', () => {
    cy.get(citySelectionQuery).type('Helsinki')
    // let's try to vote and unvote a few times
    for (let i = 0; i < 5; i++) {
      cy.get(helQuery).first()
        .contains('Vote').click()
      cy.get('#results')
        .contains('Votes: 1')
      cy.get(helQuery).first()
        .contains('Unvote').click()
      cy.get('#results').contains('Votes: 0')
    }
  })
  it('can change vote', () => {
    // difficult to check without saving restaurant and comparing it to results...
    cy.get(citySelectionQuery).type('Helsinki')
    cy.get('#results')
      .contains('Votes: 0')
    // during the loop, votes should always be 1
    for (let i = 0; i < 4; i++) {
      cy.get(helQuery).last()
        .contains('Vote')
        .click()
      cy.get('#results')
        .contains('Votes: 1')
      cy.get(helQuery).last()
        .contains('Unvote')
      cy.get(helQuery).first()
        .contains('Vote')
        .click()
      cy.get('#results')
        .contains('Votes: 1')
      cy.get(helQuery).first()
        .contains('Unvote')
    }
    // reset votes to zero
    cy.get(helQuery).first()
      .contains('Unvote')
      .click()
    cy.get('#results').contains('Votes: 0')
  })
})
