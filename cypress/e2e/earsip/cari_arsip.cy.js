describe('Pencarian Arsip - Login',()=>{

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})  
    beforeEach(()=>{
        cy.login('uu@earsip.co.id','P@ssw0rd123');
    });   
    
    // it('Mencari dokumen berdasarkan keyword',()=>{
    //    cy.search_ams();
    // })
    
    it('Mencari dokumen berdasarkan periode',()=>{
       cy.search_ams();
       cy.date_picker_from_ams();
       cy.date_picker_to_ams();
    })
})