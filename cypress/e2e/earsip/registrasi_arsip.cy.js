describe('Register Arsip Fisik', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
  })


  beforeEach(()=>{
    cy.login('uf@earsip.co.id','P@ssw0rd123')
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
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const monthIndex = currentDate.getMonth();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const shortMonthName = monthNames[monthIndex];

  const formattedDate = `${String(dayOfMonth).padStart(2, '0')} ${shortMonthName}`;
  it('Register Arsip Fisik Inaktif', () => {
    let currentCounter = Cypress.env('counter');
    currentCounter++;
    Cypress.env('counter', currentCounter);
      cy.input_register(box.count,box.no_box,`${box.context+Cypress.env('counter')}`,'fisik','inaktif',box.year,box.classification,`${box.no_arsip+Cypress.env('counter')}`);
      cy.simpan_register_arsip();
      cy.wait(2000);
      // cy.assertion_success();
  })
  
    it('Verifikasi Unit Umum',()=>{
      cy.login('uu@earsip.co.id','P@ssw0rd123');
      cy.wait(3000)
      cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/physically-inactive-schedule')
      cy.wait(3000)
      cy.get('td').contains(`${box.no_box}`).prev().click();
      cy.get('button').contains('Buat Jadwal').click();
      cy.get('button').contains('Jadwalkan').click();
      cy.get('button').contains('Ya').click();
      cy.get('button').contains('OK').click();
    })

    it('Verifikasi Unit Fungsi',()=>{
      cy.login('uf@earsip.co.id','P@ssw0rd123');
      cy.wait(3000)
      cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/physically-inactive-schedule')
      cy.get('td').contains(`${formattedDate}`).prev().prev().click();
      cy.get('button').contains('Konfirmasi').click();
      cy.get('button').contains('Ya').click();
      cy.get('button').contains('OK').click();
    })

    it('Penerimaan Unit Umum',()=>{
      cy.login('uu@earsip.co.id','P@ssw0rd123');
      cy.wait(3000)
      cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/physically-inactive-schedule')
      cy.wait(3000)
      cy.get('span').contains('Penerimaan').click();
      cy.get('td').contains(`${formattedDate}`).prev().prev().click();
      cy.get('[style="background-color: rgb(82, 189, 148); color: rgb(255, 255, 255); caret-color: rgb(255, 255, 255);"]').click();
      cy.get('button').contains('Ya').click();
      cy.get('button').contains('OK').click();
    })

    it('Kirim ke RC',()=>{
      cy.login('uu@earsip.co.id','P@ssw0rd123');
      cy.wait(3000)
      cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/physically-inactive-schedule')
      cy.wait(3000)
      cy.get('span').contains('Kirim Record Center').click();
      cy.get('td').contains(`${box.no_box}`).prev().click();
      cy.get('button').contains('Buat Jadwal').click();
      cy.get('input[placeholder="Pilih Record Center"]').type('GEDUNG ARSIP JAGAKARSA{downarrow}{enter}')
      cy.get('.w-100 > [style="background-color: rgb(82, 189, 148); color: rgb(255, 255, 255); caret-color: rgb(255, 255, 255);"] > .v-btn__content').click();
      cy.get('button').contains('OK').click();

    })

    it('Penjadwalan RC',()=>{
      cy.login('rc@earsip.co.id','P@ssw0rd123');
      cy.wait(3000)
      cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/physically-inactive-pickup-scheduled-rc')
      cy.get('td').contains(`${formattedDate}`).prev().prev().click();
      cy.get('button').contains('Konfirmasi').click();
      cy.get('button').contains('Jadwalkan').click();
      cy.get('button').contains('OK').click();

    })

    it('Konfirmasi Penjemputan',()=>{
      cy.login('uu@earsip.co.id','P@ssw0rd123');
      cy.wait(3000)
      cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/physically-inactive-schedule')
      cy.wait(3000)
      cy.get('span').contains('Konfirmasi Penjemputan').click();
      cy.get('td').contains(`${formattedDate}`).prev().prev().click();
      cy.get('.v-col-4 > .v-btn').click();
      cy.get('button').contains('Ya').click();
      cy.get('button').contains('OK').click();
    })

    it('Penerimaan RC',()=>{
      cy.login('rc@earsip.co.id','P@ssw0rd123');
      cy.wait(3000)
      cy.visit('https://web-blue.air.id/dev-earsip/archive-management/confirm/physically-inactive-receipt-rc')
      cy.get('td').contains(`${formattedDate}`).prev().prev().click();
      cy.get('button').contains('Konfirmasi').click();
      cy.get('button').contains('Ya').click();
      cy.get('button').contains('OK').click();
    })

    it('Pengarsipan RC',()=>{
      cy.save_archive(`${box.context}`);
    })
    
})

// it('Register Arsip Digital Aktif', () => {
  //       const boxes = [
  //     { no_box: '140135',count:2 },
  //     { no_box: '140135',count:5 },
  //   ];
  //   boxes.forEach((box)=>{
  //   cy.input_register(box.count,box.no_box,'Digital Aktif','digital','aktif',"2023");
  //   cy.simpan_register_arsip();
  //   cy.assertion_success();
  //   cy.wait(5000);
  // })
// })

  // it('Register Arsip Digital Inaktif', () => {
  //   const boxes = [
  //     { no_box: '140135',count:2 },
  //     { no_box: '140135',count:5 },
  //   ];
  //     boxes.forEach((box)=>{
  //     cy.input_register(box.count,box.no_box,'Digital Inaktif','digital','inaktif',"2020");
  //     cy.simpan_register_arsip();
  //     cy.assertion_success();
  //     cy.wait(5000);
  //   })
  // })

  // it('Register Arsip Digital Aktif dengan tanggal yang tidak sesuai', () => {
  //   cy.input_register('Digital Aktif','digital','aktif',"1950");
  //   cy.simpan_register_arsip();
  //   cy.assertion_failed_register();
  //   cy.wait(5000);
  // })



// describe('Verifikasi Arsip', () => {
//   Cypress.on('uncaught:exception', (err, runnable) => {
//         // returning false here prevents Cypress from
//         // failing the test
//         return false
//   })
//   beforeEach(()=>{
//     cy.login('uu@earsip.co.id','P@ssw0rd123')
//   })
//     it('Verifikasi Arsip Digital Aktif', () => {
//     cy.get_digital_archive();
//     cy.wait(3000)
//     cy.verify_digital_archive();
//     cy.wait(5000);
//     })

// })

// describe('Register Arsip - Admin RC', () => {
//   Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
  //       return false
  // })
  // beforeEach(()=>{
  //   cy.login('admin.rc@earsip.co.id','P@ssw0rd123')
  // })
  //   it('Register Percepatan RC', () => {
  //   const boxes = [
  //     { no_arsip: '140190',hal:"Arsip BUMN 1" },
  //     { no_arsip: '140191',hal:"Arsip BUMN 2" },
  //     { no_arsip: '140193',hal:"Arsip BUMN 3" },
  //     { no_arsip: '140194',hal:"Arsip BUMN 4" },
  //     { no_arsip: '140195',hal:"Arsip BUMN 5" }
  //   ];
  //     boxes.forEach((box)=>{
  //       cy.register_admin_rc(box.no_arsip,box.hal);
  //       cy.assert_success_register(box.no_arsip);
  //   })

  //   })

    // it('Register Percepatan RC No. Arsip telah terdaftar', () => {
    //   const boxes = [
    //     { no_arsip: '140131',hal:"Arsip BUMN 1" },
    //     { no_arsip: '140132',hal:"Arsip BUMN 2" },
    //     { no_arsip: '140133',hal:"Arsip BUMN 3" },
    //     { no_arsip: '140134',hal:"Arsip BUMN 4" },
    //     { no_arsip: '140135',hal:"Arsip BUMN 5" }
    //   ];
    //     boxes.forEach((box)=>{
    //       cy.register_admin_rc(box.no_arsip,box.hal);
    //       cy.assert_fail_rc_register(box.no_arsip);
    //     })
  
    //   })

  
  // it('Register Arsip Fisik Inaktif dengan tanggal yang tidak sesuai', () => {
  //   cy.input_register('Fisik Inaktif','fisik','inaktif',"2024");
  //   cy.simpan_register_arsip();
  //   cy.assertion_failed_register();
  //   cy.wait(5000);
  // })

//   it('Register Arsip Fisik Inaktif', () => {
//     const boxes = [
//       { no_box: '140135',count:2 },
//       { no_box: '140135',count:5 }
//     ];
//     boxes.forEach((box)=>{
//       cy.input_register(box.count,box.no_box,'Fisik Inaktif','fisik','inaktif',"2020");
//       cy.simpan_register_arsip();
//       cy.assertion_success();
//     })
//   })

//   it('Register Arsip Digital Aktif', () => {
//         const boxes = [
//       { no_box: '140135',count:2 },
//       { no_box: '140135',count:5 },
//     ];
//     boxes.forEach((box)=>{
//     cy.input_register(box.count,box.no_box,'Digital Aktif','digital','aktif',"2023");
//     cy.simpan_register_arsip();
//     cy.assertion_success();
//     cy.wait(5000);
//   })
// })

//   it('Register Arsip Digital Inaktif', () => {
//     const boxes = [
//       { no_box: '140135',count:2 },
//       { no_box: '140135',count:5 },
//     ];
//       boxes.forEach((box)=>{
//       cy.input_register(box.count,box.no_box,'Digital Inaktif','digital','inaktif',"2020");
//       cy.simpan_register_arsip();
//       cy.assertion_success();
//       cy.wait(5000);
//     })
//   })

  // it('Register Arsip Digital Aktif dengan tanggal yang tidak sesuai', () => {
  //   cy.input_register('Digital Aktif','digital','aktif',"1950");
  //   cy.simpan_register_arsip();
  //   cy.assertion_failed_register();
  //   cy.wait(5000);
  // })



})

describe.skip('Register Arsip Digital',()=>{
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })  


  beforeEach(()=>{
  cy.login('uf@earsip.co.id','P@ssw0rd123')
    if (Cypress.env('counter') === undefined) {
      Cypress.env('counter', 0); // Initialize if not already set
    }
  })

    const boxes = [
    { no_box: '140152',count:2,no_arsip:'102ARCH',year:"2019",context:'Dokumen Digital SOP Produk',classification:'LOG.00.02 - Pengelolaan Persediaan/ Stock'},
    { no_box: '130152',count:2,no_arsip:'102ARCH',year:"2019",context:'Dokumen Digital SOP Produk',classification:'LOG.00.02 - Pengelolaan Persediaan/ Stock'},
    { no_box: '130153',count:2,no_arsip:'102ARCH',year:"2020",context:'Dokumen Digital BRD Produk',classification:'REN.01.03'},
    { no_box: '130153',count:2,no_arsip:'102ARCH',year:"2020",context:'Dokumen Digital BRD Produk',classification:'REN.01.03'},
    { no_box: '130152',count:2,no_arsip:'102ARCH',year:"2020",context:'Dokumen Digital BRD Produk',classification:'REN.01.04 - Laporan Tahunan Perusahaan (Annual Report)'},
    { no_box: '130152',count:2,no_arsip:'102ARCH',year:"2020",context:'Dokumen Digital BRD Produk',classification:'REN.01.04 - Laporan Tahunan Perusahaan (Annual Report)'}
    ]
    boxes.forEach((box)=>{
      it('Register Arsip Fisik Inaktif', () => {
        let currentCounter = Cypress.env('counter');
        currentCounter++;
        Cypress.env('counter', currentCounter);
          cy.input_register(box.count,box.no_box,`${box.context+Cypress.env('counter')}`,'fisik','inaktif',box.year,box.classification,`${box.no_arsip+Cypress.env('counter')}`);
          cy.simpan_register_arsip();
          cy.wait(2000);
          // cy.assertion_success();
      })
    })
})