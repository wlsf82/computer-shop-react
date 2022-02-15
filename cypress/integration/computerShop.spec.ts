describe('Computer Shop', () => {
  beforeEach(() => cy.visit('/computer-shop-react'))

  it('tries to click on multiple elements', () => {
    cy.get('[data-testid="add-item-button"]')
      .click() // Does not work.
      // When the selector is not specific, cy.get returns multiple elements
  })

  it('clicks on the first button using cy.contains', () => {
    cy.contains('ADICIONAR AO CARRINHO')
      .click() // This works since cy.contains returns only one element
  })

  it('incorrectly uses cy.contains', () => {
    // cy.contains(ADICIONAR AO CARRINHO).click() // Compilation error
  })

  it('incorrectly uses cy.get as if it was cy.contains', () => {
    cy.get('[data-testid="add-item-button"]', 'ADICIONAR AO CARRINHO')
      .click()
      // cy.get() only accepts an options object for its second argument.
  })

  it('fails an expectation on purpose', () => {
    cy.get('ul li').should('have.length', 3)
    cy.contains('Acer').should('not.exist')
    // expected <p> not to exist in the DOM
  })

  it('fails another expectation on purpose', () => {
    cy.get('ul li').should('have.length', 3)
    cy.contains('Acer').should('not.be.visible')
    // expected <p> not to be visible
  })

  it('fails one more expectation on purpose', () => {
    cy.get('ul li').should('have.length', 2)
    // Too many elements found. Found '3', expected '2'.
  })

  it('tries to use a custom command when supportFile is set to false', () => {
    cy.sayHi() // cy.sayHi is not a function
  })

  it('tries to use a task when pluginsFile is set to false', () => {
    cy.task('sayHello').then((greeting: string) => cy.log(greeting))
    // The 'task' event has not been registered in the plugins file.
    // You must register it before using cy.task()
  })

  it('can\'t find element due to a typo', () => {
    cy.get('[data-test-id="add-item-button"]')
    // Expected to find element: [data-test-id="add-item-button"],
    // but never found it.
      .first()
      .click()
  })

  it('tries to import an unnexisting fixture', () => {
    cy.fixture('test')
    /**
    A fixture file could not be found at any of the following paths:

    > cypress/fixtures/test
    > cypress/fixtures/test{{extension}}

    Cypress looked for these file extensions at the provided path:

    > .json, .js, .coffee, .html, .txt, .csv, .png, .jpg, .jpeg, .gif, .tif, .tiff, .zip

    Provide a path to an existing fixture file.
    */
  })

  it('incorrectly uses aliased element', () => {
    cy.get('[data-testid="cart-size"]')
      .as('cartSize')
    cy.get('cartSize').should('contain', '0')
    // Expected to find element: cartSize, but never found it.
    // Missing @ sign
  })

  context('TS errors', function() {
    it('incorrectly defines a const without giving it a value', () => {
      const name: string // 'const' declarations must be initialized.
    })

    it('tries to overwrite a const variable', () => {
      const name = 'Walmyr'

      name = 'Pedro' // Cannot assign to 'name' because it is a constant.
    })

    it('tries to access this of an arrow function', () => {
      cy.log(this.test.title) // Cannot read properties of undefined (reading 'title')
    })

    it('cy.log vs. console.log', function() {
      this.myObject = {
        name: 'Walmyr',
        nationality: 'Brazilian',
        isMarried: true,
        hasChildren: false,
      }
      cy.log(this.myObject)
      console.log(this.myObject)
    })
  })
})
