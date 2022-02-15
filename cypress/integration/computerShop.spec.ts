describe('Live TAT - Computer Shop', () => {
  beforeEach(() => cy.visit('/computer-shop-react'))

  it('tries to click on multiple elements', () => {
    cy.get('[data-testid="add-item-button"]')
      // .click()
      .click({ multiple: true })
      // .last()
      // .first()
      // .eq(1)
      // .click()
      // cy.click() can only be called on a single element.
      // Your subject contained 3 elements.
      // Pass { multiple: true } if you want to serially click each element.
  })

  it('clicks on the first button using cy.contains', () => {
    cy.contains('ADICIONAR AO CARRINHO')
      .click() // This works since cy.contains returns only one element
  })

  it('incorrectly uses cy.contains', () => {
    // cy.contains(ADICIONAR AO CARRINHO).click() // Compilation error
    cy.contains('ADICIONAR AO CARRINHO').click() // Compilation error
  })

  it('incorrectly uses cy.get as if it was cy.contains', () => {
    // cy.get('[data-testid="add-item-button"]', 'ADICIONAR AO CARRINHO')
    cy.contains('[data-testid="add-item-button"]', 'ADICIONAR AO CARRINHO')
    // cy.get('[data-testid="add-item-button"]')
    // cy.get('[data-testid="add-item-button"]')
    //   .first()
    //   .click()
      // cy.get() only accepts an options object for its second argument.
      // You passed ADICIONAR AO CARRINHO
  })

  it('fails an expectation on purpose', () => {
    cy.get('ul li').should('have.length', 3)
    // cy.contains('Acer').should('not.exist')
    cy.contains('Acer').should('exist')
    // Expected not to find content: 'Acer' but continuously found it.
  })

  it('fails another expectation on purpose', () => {
    cy.get('ul li').should('have.length', 3)
    // cy.contains('Acer').should('not.be.visible')
    cy.contains('Acer').should('be.visible')
    // expected '<p>' not to be 'visible'
  })

  it('fails one more expectation on purpose', () => {
    // cy.get('ul li').should('have.length', 4)
    cy.get('ul li').should('have.length', 3)
    // Too many elements found. Found '3', expected '2'.
  })

  it('tries to use a custom command when supportFile is set to false', () => {
    cy.sayHi() // cy.sayHi is not a function
  })

  it('tries to use a task when pluginsFile is set to false', () => {
    cy.task('sayHello').then((greeting: string) => cy.log(greeting))
    // cy.task('sayHello') failed with the following error:

    // The 'task' event has not been registered in the plugins file.
    // You must register it before using cy.task()
  })

  it('can\'t find element due to a typo', () => {
    cy.get('[data-testid="add-item-button"]')
    // cy.get('[data-test-id="add-item-button"]')
    // Expected to find element: [data-test-id="add-item-button"],
    // but never found it.
      .first()
      .click()
  })

  context('Regressions', () => {
    //https://github.com/cypress-io/cypress/issues/20208
    it('tries to import an unnexisting fixture', () => {
      cy.fixture('test')
      // cy.fixture('example')
      /**
       * v9.4.1
       * A fixture file could not be found at any of the following paths:
       *
       * > cypress/fixtures/test
       * > cypress/fixtures/test{{extension}}
       *
       * Cypress looked for these file extensions at the provided path:
       *
       * > .json, .js, .coffee, .html, .txt, .csv, .png, .jpg, .jpeg, .gif, .tif, .tiff, .zip
       *
       * Provide a path to an existing fixture file.
      */
     /**
       * v9.5.0
       * A fixture file could not be found at any of the following paths:
       *
       * [90m > [39m [94mcypress/fixtures/test [39m
       * [90m > [39m [94mcypress/fixtures/test [39m.[ext]
       *
       * Cypress looked for these file extensions at the provided path:
       *
       * [90m > [39m [94.json, .js, .coffee, .html, .txt, .csv, .png, .jpg, .jpeg, .gif, .tif, .tiff, .zip[39m
       *
       * Provide a path to an existing fixture file.
      */
    })

    it.only('incorrectly uses aliased element (missing @ sign)', () => {
      cy.get('[data-testid="cart-size"]')
        .as('cartSize')
      // cy.get('cartSize').should('contain', '0')
      cy.get('@cartSize').should('contain', '0')
      // v9.4.1
      // Expected to find element: cartSize, but never found it.
      // v9.5.0
      // Expected to find element: [data-test-id="add-item-button"], but never found it.
    })
  })

  context('TS errors', function() {
    it('incorrectly defines a const without giving it a value', () => {
      // const name: string // 'const' declarations must be initialized.
      const name = 'Walmyr'
    })

    it('tries to overwrite a const variable', () => {
      // const name = 'Walmyr'
      let name = 'Walmyr'

      name = 'Pedro' // Cannot assign to 'name' because it is a constant.
    })

    it.skip('tries to access this of an arrow function', () => {
      cy.log(this.test.title)
      // Cannot read properties of undefined (reading 'title')
    })

    it('is able to access this of a function', function() {
      cy.log(this.test.title)
    })
  })

  it('cy.log vs. console.log', function() {
    this.myObject = {
      name: 'Walmyr',
      nationality: 'Brazilian',
      isMarried: true,
      hasChildren: false,
      hobbies: [
        'Skateboarding',
        'Cycling',
        'Reading'
      ]
    }
    cy.log(this.myObject)
    console.log('Esse é o meu console.log: ', this.myObject)

    const myObj = JSON.stringify(this.myObject)
    cy.log(myObj)
  })
})
