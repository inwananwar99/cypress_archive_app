describe.skip('Peminjaman Fisik Inaktif - Non Vital Biasa',()=>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    beforeEach(()=>{
        cy.login('pg@earsip.co.id','P@ssw0rd123')
        if (Cypress.env('counter') === undefined) {
          Cypress.env('counter', 0); // Initialize if not already set
        }
    })

    it('Cari Arsip',()=>{
          cy.visit('https://web-blue.air.id/dev-earsip/search');
          cy.get('.v-list-item__append > .v-btn').click();
          cy.get('input').type('Dokumen{enter}');
          cy.get('.v-list-item-subtitle').contains('Pinjam Arsip').click();
          cy.get('.swal2-confirm').click();
    })

    it('Konfirmasi Arsip',()=>{
        cy.visit('https://web-blue.air.id/dev-earsip/archive-lending/list')
        cy.get(':nth-child(1) > [style="width: 100px;"] > .bg-teal-accent-1').click()
        cy.get('input[placeholder="Keperluan Peminjaman"]').type('Peminjaman Test')
        cy.get(':nth-child(2) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .mdi-calendar').click();
        cy.get('button').contains('27').click();
        cy.get('.d-flex > .v-input > .v-input__control > .v-field').type('{downarrow}{enter}')
        cy.get('button').contains('Ajukan Peminjaman').click();
        cy.get('.swal2-confirm').contains('Ya').click()
        cy.get('.swal2-confirm').contains('OK').click()
    })
    
    it('Approval Atasan Pegawai',()=>{
        cy.login('pg2@earsip.co.id','P@ssw0rd123')
        cy.visit('https://web-blue.air.id/dev-earsip/archive-lending/agreement');
        cy.get(':nth-child(1) > :nth-child(7) > .v-btn').click();
        cy.get('input[placeholder="Alasan"]').type('Setuju');
        cy.get('button').contains('Setujui').click();
        cy.get('.swal2-confirm').contains('Ya').click()
        cy.get('.swal2-confirm').contains('OK').click()
    })
    
    it('Approval Record Center',()=>{
        cy.login('rc@earsip.co.id','P@ssw0rd123')
        cy.visit('https://web-blue.air.id/dev-earsip/archive-lending/delivery');
        cy.get(':nth-child(1) > :nth-child(7) > .v-btn').click();
        cy.get('input[placeholder="Unggah Berkas"]').selectFile('./cypress/fixtures/Bukti Kontrak.pdf',{force:true});
        cy.get('button').contains('Konfirmasi').click();
        cy.get('.swal2-confirm').contains('OK').click()
    })
    
    it('Konfirmasi Pegawai',()=>{
        cy.login('pg@earsip.co.id','P@ssw0rd123')
        cy.visit('https://web-blue.air.id/dev-earsip/archive-lending/lending-list')
    })

})


describe('Peminjaman Fisik Inaktif - Non Vital Terbatas',()=>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    beforeEach(()=>{
        cy.login('pg@earsip.co.id','P@ssw0rd123')
        if (Cypress.env('counter') === undefined) {
          Cypress.env('counter', 0); // Initialize if not already set
        }
    })

    it('Cari Arsip',()=>{
          cy.visit('https://web-blue.air.id/dev-earsip/search');
          cy.get('.v-list-item__append > .v-btn').click();
          cy.get('input').type('Dokumen{enter}');
          cy.get('.v-list-item__content > v-list-item-content > :nth-child(3) > :nth-child(4)').contains('Terbatas');
          cy.get('.v-list-item-subtitle').contains('Pinjam Arsip').click();
        //   cy.get('.swal2-confirm').click();
    })

    // it('Konfirmasi Arsip',()=>{
    //     cy.visit('https://web-blue.air.id/dev-earsip/archive-lending/list')
    //     cy.get(':nth-child(1) > [style="width: 100px;"] > .bg-teal-accent-1').click()
    //     cy.get('input[placeholder="Keperluan Peminjaman"]').type('Peminjaman Test')
    //     cy.get(':nth-child(2) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .mdi-calendar').click();
    //     cy.get('button').contains('27').click();
    //     cy.get('.d-flex > .v-input > .v-input__control > .v-field').type('{downarrow}{enter}')
    //     cy.get('button').contains('Ajukan Peminjaman').click();
    //     cy.get('.swal2-confirm').contains('Ya').click()
    //     cy.get('.swal2-confirm').contains('OK').click()
    // })
    
    // it('Approval Atasan Pegawai',()=>{
    //     cy.login('pg2@earsip.co.id','P@ssw0rd123')
    //     cy.visit('https://web-blue.air.id/dev-earsip/archive-lending/agreement');
    //     cy.get(':nth-child(1) > :nth-child(7) > .v-btn').click();
    //     cy.get('input[placeholder="Alasan"]').type('Setuju');
    //     cy.get('button').contains('Setujui').click();
    //     cy.get('.swal2-confirm').contains('Ya').click()
    //     cy.get('.swal2-confirm').contains('OK').click()
    // })

    // it('Approval Manajemen Atas',()=>{
    //     cy.login('uf@earsip.co.id','P@ssw0rd123')
    //     cy.visit('https://web-blue.air.id/dev-earsip/archive-lending/agreement');
    //     cy.get(':nth-child(1) > :nth-child(7) > .v-btn').click();
    //     cy.get('input[placeholder="Alasan"]').type('Setuju');
    //     cy.get('button').contains('Setujui').click();
    //     cy.get('.swal2-confirm').contains('Ya').click()
    //     cy.get('.swal2-confirm').contains('OK').click()
    // })
    
    // it('Approval Record Center',()=>{
    //     cy.login('rc@earsip.co.id','P@ssw0rd123')
    //     cy.visit('https://web-blue.air.id/dev-earsip/archive-lending/delivery');
    //     cy.get(':nth-child(1) > :nth-child(7) > .v-btn').click();
    //     cy.get('input[placeholder="Unggah Berkas"]').selectFile('./cypress/fixtures/Bukti Kontrak.pdf',{force:true});
    //     cy.get('button').contains('Konfirmasi').click();
    //     cy.get('.swal2-confirm').contains('OK').click()
    // })
    
    // it('Konfirmasi Pegawai',()=>{
    //     cy.login('pg@earsip.co.id','P@ssw0rd123')
    //     cy.visit('https://web-blue.air.id/dev-earsip/archive-lending/lending-list')
    // })

})
