describe('Usul Statis ANRI',()=>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
  })

  beforeEach(()=>{
    cy.login('uu@earsip.co.id','P@ssw0rd123')
    if (Cypress.env('counter') === undefined) {
      Cypress.env('counter', 0); // Initialize if not already set
    }
  })

  const boxes = [
    { no_box: '140152',count:2,no_arsip:'102ARCH',year:"2019",context:'Dokumen SOP Produk',classification:'LOG.00.02 - Pengelolaan Persediaan/ Stock'},
    { no_box: '130152',count:2,no_arsip:'102ARCH',year:"2019",context:'Dokumen SOP Produk',classification:'LOG.00.02 - Pengelolaan Persediaan/ Stock'},
    { no_box: '130153',count:2,no_arsip:'102ARCH',year:"2020",context:'Dokumen BRD Produk',classification:'REN.01.03'},
    { no_box: '130153',count:2,no_arsip:'102ARCH',year:"2020",context:'Dokumen BRD Produk',classification:'REN.01.03'},
    { no_box: '130152',count:2,no_arsip:'102ARCH',year:"2020",context:'Dokumen BRD Produk',classification:'REN.01.04 - Laporan Tahunan Perusahaan (Annual Report)'},
    { no_box: '130152',count:2,no_arsip:'102ARCH',year:"2020",context:'Dokumen BRD Produk',classification:'REN.01.04 - Laporan Tahunan Perusahaan (Annual Report)'}
  ]
  boxes.forEach((box)=>{
      it.skip('Inisiasi Tindak Lanjut',()=>{
          cy.visit('https://web-blue.air.id/dev-earsip/archive-management/files/fisik-inactive');
          cy.contains('tr', `${box.context}`).within(() => {
              cy.get('input[type="checkbox"]').click();
          });
          cy.get('button').contains('Inisiasi Tindak Lanjut').click()
          cy.wait(3000)
          cy.get('.swal2-confirm').contains('Ya').click();
          cy.get('#swal2-title').contains('Berhasil').click();
      })
    })

      it.skip('Pengajuan Statis',()=>{
        cy.visit('https://web-blue.air.id/dev-earsip/archive-management/follow-up/inactive-retention/permanent');
        cy.get(':nth-child(1) > .v-data-table__td--expanded-row > .v-btn').click()
        cy.get(':nth-child(3) > .v-data-table__td--expanded-row > .v-btn').click()
        cy.get(':nth-child(2) > .pa-3 > .v-table > .v-table__wrapper > table > thead > tr > .v-data-table-column--no-padding').click()
        cy.get(':nth-child(4) > .pa-3 > .v-table > .v-table__wrapper > table > thead > tr > .v-data-table-column--no-padding').click()
        cy.get('button').contains('Ajukan Statis').click();
        cy.get('.swal2-confirm').contains('Ya').click();
        cy.get('#swal2-title').contains('Berhasil').click();
      })

      it('Konfirmasi Permanen Umum Induk',()=>{
        cy.login('uu.ui@earsip.co.id','P@ssw0rd123');
        cy.visit('https://web-blue.air.id/dev-earsip/archive-management/follow-up/confirmation/permanent')
        cy.get(':nth-child(1) > .v-data-table__td--expanded-row > .v-btn').click()
        cy.get(':nth-child(3) > .v-data-table__td--expanded-row > .v-btn').click()
        cy.get(':nth-child(2) > .pa-3 > .v-table > .v-table__wrapper > table > thead > tr > .v-data-table-column--no-padding').click()
        cy.get(':nth-child(4) > .pa-3 > .v-table > .v-table__wrapper > table > thead > tr > .v-data-table-column--no-padding').click()
        cy.get('button').contains('Terima').click();
        cy.get('.swal2-confirm').contains('Ya').click();
        cy.get('#swal2-title').contains('Berhasil').click();
        cy.get('.swal2-confirm').contains('OK').click();

      })

      it('Konfirmasi Permanen Umum Pusat',()=>{
        cy.login('uu.pusat@earsip.co.id','P@ssw0rd123');
        cy.visit('https://web-blue.air.id/dev-earsip/archive-management/follow-up/confirmation/permanent')
        cy.get(':nth-child(1) > .v-data-table__td--expanded-row > .v-btn').click()
        cy.get(':nth-child(3) > .v-data-table__td--expanded-row > .v-btn').click()
        cy.get(':nth-child(2) > .pa-3 > .v-table > .v-table__wrapper > table > thead > tr > .v-data-table-column--no-padding').click()
        cy.get(':nth-child(4) > .pa-3 > .v-table > .v-table__wrapper > table > thead > tr > .v-data-table-column--no-padding').click()
        cy.get('button').contains('Terima').click();
        cy.get('.swal2-confirm').contains('Ya').click();
        cy.get('#swal2-title').contains('Berhasil').click();
        cy.get('.swal2-confirm').contains('OK').click();
      })
})