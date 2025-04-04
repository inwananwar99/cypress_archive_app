describe('Multiple Select Arsip Proses Konfirmasi',()=>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
  })
    beforeEach(()=>{
        cy.login('uu@earsip.co.id','P@ssw0rd123')
    })
    it('Unit Umum - Penjadwalan',()=>{
        cy.get_arsip_fisik_inaktif(null);
        cy.get_grouping_box();
        cy.check_box();
        cy.higher_box();
    })

    // it('Unit Umum - Penerimaan',()=>{
    //     cy.get_arsip_fisik_inaktif('Penerimaan');
    // })

    // it('Unit Umum - Kirim Record Center',()=>{
    //     cy.get_arsip_fisik_inaktif('Kirim Record Center');
    // })

    // it('Unit Umum - Konfirmasi Penjemputan',()=>{
    //     cy.get_arsip_fisik_inaktif('Konfirmasi Penjemputan');
    // })
})