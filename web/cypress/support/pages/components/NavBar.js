
class NavBar{

    userLoggedIn(name){
        cy.contains('aside .logged-user', 'Olá, ', + name).should('be.visible')
    }

    accessAlunos(){
        cy.get(':nth-child(1) > .sc-ifAKCX').click();
    }

    

}

export default new NavBar()