
import students from '../fixtures/students.json'
import studentPage from '../support/pages/StudentPage'


describe('alunos', () => {

    it('deve poder cadastrar um novo aluno',  ()=> {
        const student = students.create
       
        cy.task('deleteStudent', student.email)
    
        cy.adminLogin()

        studentPage.goToRegister()

        studentPage.submitForm(student) 

        studentPage.popup.haveText('Dados cadastrados com sucesso.')
    })  
    
    
    it('não deve poder cadastrar com email duplicado',  ()=> {

        const student = students.duplicate
    
        cy.adminLogin()

        //cy.task('deleteStudent', student.email)
        cy.task('resetStudent', student)

        studentPage.goToRegister()

        studentPage.submitForm(student) 

        studentPage.popup.haveText('O email informado já foi cadastrado!')

    })

    it('deve remover um aluno sem matricula',  ()=> {

        const student = students.remove
        cy.task('resetStudent', student)
        cy.adminLogin()

        studentPage.search(student.name)
        //td[text()="fernando.@yahoo.com"]/..//button
        studentPage.remove(student.email)

        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')

    })


    it('Todos os campos são obrigatórios',  ()=> {
        const student = students.required
        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        /*cy.contains('label','Nome completo')
            .parent()
            .find('span')
            .should('have.text','Nome é obrigatório')
        */
        studentPage.requiredMessage('Nome completo', 'Nome é obrigatório')
        studentPage.requiredMessage('E-mail', 'O email é obrigatório')
        studentPage.requiredMessage('Idade', 'A idade é obrigatória')
        studentPage.requiredMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.requiredMessage('Altura', 'A altura é obrigatória')
      
    })

    it('Tentar cadastrar um aluno menor de 16 anos',  ()=> {
        const student = students.incorrect_age
        cy.adminLogin()
        cy.task('deleteStudent', student.email)
        studentPage.goToRegister()
        studentPage.submitForm(student) 
        studentPage.requiredMessage('Idade', 'A idade mínima para treinar é 16 anos!')
        //adicionar verificação de aluno
        studentPage.navbar.accessAlunos();
        studentPage.search(student.name)
        studentPage.check_registration_false()
    })

    it('Tentar cadastrar informando peso incorreto',  ()=> {
        const student = students.incorrect_weight
        cy.adminLogin()
        cy.task('deleteStudent', student.email)
        studentPage.goToRegister()
        studentPage.submitForm(student) 
        studentPage.requiredMessage('Peso (em kg)', 'O peso mínimo para treinar é 40 Kg')
        studentPage.navbar.accessAlunos();
        studentPage.search(student.name)
        studentPage.check_registration_false(student.email)
    })

    it('Tentar cadastrar informando altura incorreta',  ()=> {
        const student = students.incorrect_feet_tall
        cy.adminLogin()
        cy.task('deleteStudent', student.email)
        studentPage.goToRegister()
        studentPage.submitForm(student) 
        studentPage.requiredMessage('Altura', 'Não é possível cadastrar uma altura negativa ou igual a \'0\'')
        studentPage.navbar.accessAlunos();
        studentPage.search(student.name)
        studentPage.check_registration_false(student.email)
    })
})

