
import users from '../fixtures/users.json'
import loginPage from  '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentPage'

Cypress.Commands.add('adminLogin', ()=>{
    const user = users.admin
    loginPage.doLogin(user)
    studentPage.navbar.userLoggedIn(user.name)
})