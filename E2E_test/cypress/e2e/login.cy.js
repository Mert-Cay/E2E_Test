describe('Login Form E2E Testleri', () => {
  beforeEach(() => {
    // Vite sunucumuzun adresi
    cy.visit('http://localhost:5173/');
  });

  it('Başarılı giriş senaryosu ve yönlendirme', () => {
    // 1. Bilgileri doldur
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('Password123!');
    cy.get('#terms').check();

    // 2. Butonun aktif olduğunu kontrol et ve tıkla
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    // 3. Success sayfasına geçildiğini doğrula
    cy.url().should('include', '/success');
    cy.contains('Hoş geldiniz, sisteme başarıyla giriş yaptınız.').should('be.visible');
  });

  it('Hatalı girişlerde uyarı vermeli ve butonu kapalı tutmalı', () => {
    // Yanlış değerler gir
    cy.get('#email').type('gecersiz-email');
    cy.get('#password').type('123');

    // Hata mesajlarının ekranda belirdiğini doğrula
    cy.contains('Wrong Email').should('be.visible');
    cy.contains('Wrong Password').should('be.visible');

    // Butonun pasif kaldığını kontrol et
    cy.get('button[type="submit"]').should('be.disabled');
  });
});