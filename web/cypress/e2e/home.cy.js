describe('home', () => {
  it('webapp deve estar online', () => {
    //acessa a página principal da aplicação
    cy.visit('http://localhost:3000/')

    //Compara o título da página
    cy.title().should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')
  })
})