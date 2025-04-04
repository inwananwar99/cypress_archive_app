// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { filter } = require("selenium-webdriver/lib/promise");

Cypress.Commands.add('login', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('https://web-blue.air.id/dev-earsip/login');
        cy.viewport('macbook-13')
        cy.get('input[placeholder="Masukkan Email"]').type(email)
        cy.get('input[placeholder="Masukkan Password"]').type(password);
        cy.wait(3000)
        // Continue with your test steps
        cy.get('button[type="submit"]').click();
        cy.wait(5000)
    })
  })

Cypress.Commands.add('register_admin_rc',(no_arsip,hal)=>{
  cy.visit('https://web-blue.air.id/dev-earsip/archive-management/rc-register');
  cy.get('input[type="file"]').attachFile('069 - SURAT HK ALUMNI.pdf');
  cy.wait(3000)
  cy.get('textarea[placeholder="Perihal Arsip"]').type(hal);
  cy.get('input[placeholder="Nomor Arsip"]').type(no_arsip);
  cy.get('.mdi-calendar').click({force:true});
  cy.get('.v-btn--density-comfortable').click()
  cy.get('button').contains('2020').click();
  cy.get('button').contains('23').click();
  cy.get('input[placeholder="Jumlah"]').type('5');
  cy.get('input[placeholder="Pilih Satuan"]').type('Box');
  cy.get('input[placeholder="Pilih Satuan"]').type('{downarrow}{enter}');
  cy.get('input[value="asli"]').click({force:true});
  cy.get('input[value="fisik"]').click({force:true});
  cy.get('input[placeholder="Pilih Kode Klasifikasi"]').click();
  cy.get('input[placeholder="Pilih Kode Klasifikasi"]').type('{downarrow}{enter}');
  cy.wait(3000)
  cy.get('input[placeholder="Pilih Pemilik Arsip"]').click();
  cy.get('input[placeholder="Pilih Pemilik Arsip"]').type('{downarrow}{enter}');
  cy.get('input[placeholder="No. Box"]').type('6784');
  cy.get('input[placeholder="Pilih Jenis Arsip"]').type('Amandemen');
  cy.get('input[placeholder="Pilih Jenis Arsip"]').type('{downarrow}{enter}');
  cy.get('input#input-58').click();
  cy.get('input#input-58').type('{downarrow}{enter}');
  cy.get(':nth-child(5) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .mdi-menu-down').click({force:true});
  cy.get('input[placeholder="Pilih Baris"]').click();
  cy.get('input[placeholder="Pilih Baris"]').type('{downarrow}{enter}');
  cy.get('input[placeholder="Pilih Nomor Box Penyimpanan"]').click();
  cy.get('input[placeholder="Pilih Nomor Box Penyimpanan"]').type('675');
  cy.get('input[placeholder="Pilih Nomor Box Penyimpanan"]').type('{downarrow}{enter}');
  cy.wait(3000);
  cy.get('button').contains('Simpan Dokumen').click();
  cy.get('button').contains('Ya').click();
})

Cypress.Commands.add('assert_fail_rc_register',(no_arsip)=>{
  cy.get('div').should('contain.text',`Arsip dengan nomor dokumen ${no_arsip} sudah pernah diinput`);
})

Cypress.Commands.add('assert_success_register',(no_arsip)=>{
  cy.visit('https://web-blue.air.id/dev-earsip/archive-management/files');
  cy.get('td').should('contain.text',no_arsip);
})

Cypress.Commands.add('get_arsip_fisik_inaktif',(tab)=>{
  if(tab == null){
     cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/physically-inactive-schedule')
     cy.wait(5000)
  }else if(tab !== null){
     cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/physically-inactive-schedule')
     cy.get('button').contains(tab).click()
  }
})

Cypress.Commands.add('search_ams',()=>{
  cy.visit('https://web-blue.air.id/dev-earsip/search');
  cy.get('input[type="text"]').type('NODIN');
  cy.get('.mdi-file-search').click();
  cy.wait(10000);
  cy.get('.v-card > .v-list > :nth-child(1)').contains('NODIN');
})

Cypress.Commands.add('date_picker_from_ams',()=>{
  cy.get('.px-4 > :nth-child(1) > .v-input > .v-input__control > .v-field').click();
  cy.get('.v-btn--density-comfortable').click();
  cy.get('button').contains('2023').click();
  cy.get('button').contains('Januari 2023').click();
  cy.get('button').contains('Feb').click();
  cy.get('button').contains('10').click();
  cy.get('button').contains('OK').click();
})

Cypress.Commands.add('date_picker_to_ams',()=>{
  cy.get(':nth-child(2) > .v-input > .v-input__control > .v-field').click();
  cy.get('.v-btn--density-comfortable').click();
  cy.get('button').contains('2023').click();
  cy.get('button').contains('Januari 2023').click();
  cy.get('button').contains('Des').click();
  cy.get('button').contains('10').click();
  cy.get('button').contains('OK').click();
})

Cypress.Commands.add('get_grouping_box',()=>{
  cy.get('th').contains('No. Box');
  cy.get('th').contains('Pemilik Arsip');
  cy.wait(10000);
  cy.get(':nth-child(1) > .v-data-table__td--expanded-row > .v-btn').click();
})

Cypress.Commands.add('check_box',()=>{
  cy.get('input#input-42').check();
  cy.wait(5000) 
  cy.get('input#input-42').uncheck(); 
})

Cypress.Commands.add('higher_box',()=>{
  cy.get('tbody > :nth-child(1)').then((text) => {
    const elementText = text;
    console.log(elementText)
  });
  // cy.get('tbody > :nth-child(2) > :nth-child(2)')
})

  Cypress.Commands.add('input_register', (count,box,perihal,format,kategori,tahun,klasifikasi,no_arsip) => {
    // Get the current date
    // const today = new Date();

    // Get individual components
    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    // const day = String(today.getDate()).padStart(2, '0');

    // Format the date as "YYYY-MM-DD"
    // const formattedDate = `${day}-${month}-${year}`;

      cy.on('uncaught:exception', () => {
        return false; // Prevent uncaught exceptions from failing the test immediately
      });
      cy.visit('https://web-blue.air.id/dev-earsip/archive-management/register')
      cy.wait(2000)
      cy.get('button').contains("Register Arsip").click();
      cy.wait(2000)
      cy.get('input[type="file"]').selectFile('./cypress/fixtures/Bukti Kontrak.pdf',{force:true});
      cy.wait(3000)
      cy.get('textarea[placeholder="Hal Arsip"]').type(perihal)
      cy.get('input[placeholder="No. Arsip"]').type(no_arsip)
      cy.get('.mt-4 > .v-card-text > .v-input--readonly > .v-input__control > .v-field').click();
      cy.get('.v-btn--density-comfortable').click({force: true});
      cy.wait(3000)
      cy.get('button').contains(tahun).click({force: true} );
      cy.wait(3000)
      cy.get('button').contains("8").click();
      cy.wait(3000)
      cy.get('input[placeholder="Jumlah"]').type(count,{force:true});
      cy.get('input[placeholder="Pilih Satuan"]').type('Box');
      cy.get('input[placeholder="Pilih Satuan"]').type('{downarrow}{enter}');
      cy.get('input[value="asli"]').click({force:true});
      cy.get(`input[value="${format}"]`).click({force:true});
      // cy.wait(3000)
      cy.get('input[placeholder="Pilih Kode Klasifikasi"]').type(`${klasifikasi}{downarrow}{enter}`);
      cy.wait(3000)
      cy.get('input[placeholder="Nama Pencipta Arsip"]');
      cy.get('input[placeholder="No. Box"]').type(box);
      cy.get('input[placeholder="Pilih Jenis Arsip"]').type('Amandemen');
      cy.get('input[placeholder="Pilih Jenis Arsip"]').type('{downarrow}{enter}');
      cy.get(`input[value="${kategori}"]`).click({force:true});
      cy.get('input[placeholder="Keterangan"]').type('Test');
  })

  Cypress.Commands.add('simpan_register_arsip', () => {
    cy.get('button').contains('Simpan Dokumen').click();
    cy.wait(3000);
    cy.get('button').contains('Ya').click();
  })

  Cypress.Commands.add('assertion_success', () => {
    cy.get('button').contains('Ya').click();
    cy.get('div#swal2-html-container').contains('Data berhasil disimpan');
    cy.wait(3000);
    cy.get('button').contains('OK').click();
  })

  Cypress.Commands.add('assertion_failed_register', () => {
    cy.get('button').contains("Ya, Saya Mengerti").click()
    cy.get('div').contains('Kategori Arsip salah');
  })

  Cypress.Commands.add('get_digital_archive',()=>{
    cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/digitally')
  })

  Cypress.Commands.add('verify_digital_archive',()=>{
    cy.get('input[type="checkbox"]').click({force:true});
    cy.get('button').contains("Verifikasi").click();
    cy.get('button').contains("Setuju").click();
    cy.wait(3000);
    cy.get('button').contains("OK").click();
  })

  Cypress.Commands.add('register_drt',()=>{
    cy.visit('https://dev-eproc.air.id/login');
    cy.get('span').contains('Daftar Sekarang').click();
    cy.contains('label', 'Nama Perusahaan')
    .should('have.attr', 'for')
    .then((inputId) => {
        cy.get(`#${inputId}`).type('Cikasungka'); // Type into the input
    });
    cy.contains('label', 'Nomor Telepon Perusahaan')
    .should('have.attr', 'for')
    .then((inputId) => {
        cy.get(`#${inputId}`).type('087765845454'); // Type into the input
    });
    cy.contains('label', 'Email Perusahaan')
    .should('have.attr', 'for')
    .then((inputId) => {
        cy.get(`#${inputId}`).type('cikasungka2@yopmail.com'); // Type into the input
    });
    cy.contains('label', 'Password')
    .should('have.attr', 'for')
    .then((inputId) => {
        cy.get(`#${inputId}`).type('P@ssw0rd'); // Type into the input
    });
    cy.get('button').contains('Daftar').click();
    cy.wait(10000)

})

Cypress.Commands.add('save_archive',(perihal)=>{
  cy.request({
      method: 'POST',
      url: 'https://api-red.air.id/api/earsip/rest/auth/login',
      body:{"email":"uf@earsip.co.id","password":"P@ssw0rd123"},
      headers: {
        'Content-Type': 'application/json'
      },
    timeout: 5000, // Request timeout (in milliseconds)
    failOnStatusCode: false // Do not fail the test on non-2xx status codes (use with caution)
    }).then((response) => {        
        cy.wrap(response.body.data.token).as('authToken');   
        cy.wrap(perihal).as('hal');   
    });
  cy.get('@authToken').then((token)=>{
      cy.request({
        method: 'GET', // HTTP method
        url: 'https://api-red.air.id/api/earsip/rest/registration/listData',
        headers: { // Custom headers
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'flowStep': 'saveRC',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000, // Request timeout (in milliseconds)
        failOnStatusCode: false // Do not fail the test on non-2xx status codes (use with caution)
      }).then((response) => {
        cy.get('@hal').then((context)=>{
          const datas = response.body.data.content;
          const perihal = datas.filter(datas => datas.perihal.includes(context));
          cy.wrap(perihal[0].id).as('id');
          cy.get('@id').then((id_arsip)=>{
              cy.request({
                  method: 'POST', // HTTP method
                  url: 'https://api-red.air.id/api/earsip/rest/registration/create-archive', // URL
                  body: {"odner":null,"lokasi":"GEDUNG ARSIP JAGAKARSA","gedungArsip":1,"lantaiArsip":1,"ruangArsip":1,"rowArsip":9521,"rakArsip":1,"noBox":"","gedungName":"U","lantaiName":"1","ruangName":"R","barisName":"5F","rakName":"A","id":`${id_arsip}`,"code":"U.1.R/A.5F/ADMINISTRASI UMUM UP3 TELUKNAGA","fungsi":"ADMINISTRASI UMUM UP3 TELUKNAGA","isSertifikat":false,"provinsi":"","boxName":""}, 
                  headers: { // Custom headers
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'flowStep': 'archive',
                    'Authorization': `Bearer ${token}`
                  },
                  timeout: 5000, // Request timeout (in milliseconds)
                  failOnStatusCode: false // Do not fail the test on non-2xx status codes (use with caution)
                }).then((response) => {
                  console.log(response)
              });
          });
        })
    });
    
  }) 
})

// curl 'https://api-red.air.id/api/earsip/rest/registration/detail?registeredArchiveId=0195d70fe6517a9693b50467ddd7b889' \
//   -H 'accept: application/json, text/plain, */*' \
//   -H 'accept-language: en-US,en;q=0.9' \
//   -H 'authorization: Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJyY0BlYXJzaXAuY28uaWQiLCJpYXQiOjE3NDI1NDcwMTIsImV4cCI6MTc0NTEzOTAxMn0._RWhf1vo11Y88bnY1FoqEja8M-cod3YNmxYdHZBBBh0QcgnA5fOFB1eXoyRHfK2S' \
//   -H 'issave: save' \
//   -H 'origin: https://web-blue.air.id' \
//   -H 'priority: u=1, i' \
//   -H 'referer: https://web-blue.air.id/' \
//   -H 'sec-ch-ua: "Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "Windows"' \
//   -H 'sec-fetch-dest: empty' \
//   -H 'sec-fetch-mode: cors' \
//   -H 'sec-fetch-site: same-site' \
//   -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'

// https://api-red.air.id/api/earsip/rest/registration/listData?page=0&size=10&filter=




  