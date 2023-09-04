/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(string: string): Chainable<Subject>
  }
}
