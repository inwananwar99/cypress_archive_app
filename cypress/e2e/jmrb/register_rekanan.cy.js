describe('Register Badan Usaha',()=>{
    it('Registrasi Baru',()=>{
        cy.visit('https://dev-eproc.air.id');
        cy.get('button').contains('Daftar').click()
        cy.get('input[value="Badan Usaha"]').click()
        cy.register_drt();
    })
})

describe('Register Perorangan',()=>{
    it('Registrasi Baru',()=>{
        cy.visit('https://dev-eproc.air.id');
        cy.get('button').contains('Daftar').click()
        cy.get('input[value="Perorangan"]').click()
        cy.register_drt();
    })
})