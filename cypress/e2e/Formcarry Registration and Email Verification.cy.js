
import 'cypress-mailslurp';
import dayjs from 'dayjs'; //for date manipulation
Cypress.dayjs = dayjs;

describe('Formcarry Registration and Email Verification test', () => {
  const testEmail = 'tip-number@mtwxiidq.mailosaur.net';// Email to be used in the test Registration
  const password = testEmail;

  it('Registers successfully and verifies alert message after login', () => {
    // Check Fails to login before regsiter the email
    cy.visit('https://app.formcarry.com/login');
    cy.get('#email').type(testEmail);
    cy.get('#password').type(testEmail);
    cy.get("button[type='submit']").click();
    //Toast messge
    cy.get('.go2072408551').should('have.text', "Couldn't find any user with that email");

    // Visit Formcarry registration page
    cy.visit('https://app.formcarry.com/register');
    // Fill the registration form
    cy.get('#name').type('Jacab Bethal');
    cy.get('#email').type(testEmail);
    cy.get('#password').type(password);
    cy.get('#job').select('Software Developer');
    // Submit the form
    cy.get("button[type='submit']").click();
    cy.wait(2000);
    // Wait for the page to load after login
    cy.url().should('include', '/');
    
    // Verify main page message
    cy.get('.eHYJWa', { timeout: 10000 })
      .should('be.visible')  
      .and('have.text', "Let's create your first form!");

  });
});

 
describe('Mailosaur Email Verification Flow for Formcarry email', () => {
  const Mailosauremail = 'heysk007@gmail.com';
  const emailtest = 'tip-number@mtwxiidq.mailosaur.net';
  const email = 'heysk007@gmail.com';

  it('Logs into Mailosaur and verifies Formcarry email', () => {
    cy.visit('https://mailosaur.com/app/login');
    cy.get('#email').type(Mailosauremail);
    cy.get("button[type='submit']").click();

    // Enter password as same email and submit
    cy.get('#password').type(Mailosauremail);
    cy.get("button[type='submit']").click();

    cy.get("a[data-testid='mtwxiidq-0']", { timeout: 10000 })
      .should('be.visible')
      .and('contain', Mailosauremail)
      .click();

      cy.wait(8000);
    // Extract the date text from the DOM
    cy.get('[data-testid="datetime"]')
      .invoke('text')
      .then((dateText) => {
        // Trim any extra whitespace
        const extractedDate = dateText.trim().split(',')[0]; // Extracts "May 23"
        // Format the current date to match the extracted format
        const currentDate = Cypress.dayjs().format('MMM DD'); // Formats as "May 23"
        // Log both dates for debugging
        cy.log('Extracted Date:', extractedDate);
        cy.log('Current Date:', currentDate);
        // Assert that the extracted date matches the current date
        expect(extractedDate).to.equal(currentDate);
      });


    // Wait for inbox to load and check 1 emails exist
    cy.get('table[data-testid="message-list"] tbody tr', { timeout: 50000 })
      .should('have.length', 1);
   

    // Open verification email
    cy.get('[data-testid="subject"]').click();
    cy.get('h1',{ timeout: 10000 })
      .should('contain.text', 'Activate your Formcarry account!');
    cy.contains('Activate My Account').should('be.visible');


    // Validate the email matches the stored email in the sidebar
    cy.get('[data-testid="generated-email"]')
      .invoke('text')
      .should('match', /@mtwxiidq\.mailosaur\.net$/);


    // Open the API response overlay
    cy.get('[data-testid="sidebar-apiresponse"]')
      .click();

    // Validate the API payload content
    cy.get('[data-testid="data-key-pair"]')
      .should('contain.text', 'Activate your Formcarry account!')
      .and('contain.text', 'noreply@formcarry.email');

    // Open the attachments section
    cy.get('[data-testid="sidebar-attachments"]')
      .click();
    // Check for 'No attachments' message
    cy.get('[data-testid="empty-state-title"]')
      .should('include.text', 'No attachments')
      .and('be.visible');

    // Extract and visit verification link
    cy.contains('a', 'Activate My Account')
      .should('have.attr', 'href')
      .then((href) => {
        cy.visit(href); // Visit the verification link

        // Wait for the success message on the new origin 
        cy.origin('https://app.formcarry.com/', () => {
          // test FormKeep elements
          cy.get('.eRYzHW', { timeout: 10000 })
            .should('contain.text', 'Your email is verified');
        });

        //login mailosaur and clear the emails
        cy.visit('https://mailosaur.com/app/login');
        cy.get('#email').type(Mailosauremail);
        cy.get("button[type='submit']").click();

        // Enter password as same email and submit
        cy.get('#password').type(Mailosauremail);
        cy.get("button[type='submit']").click();

        cy.get("a[data-testid='mtwxiidq-0']", { timeout: 10000 })
          .should('be.visible')
          .and('contain', Mailosauremail)
          .click();
        // Delete the email after testing
        cy.get('[data-testid="empty-server"]').click();
        cy.get('[data-testid="delete-dialog-confirm"]').click();


      });
    it('login to in formcarry AFTER regsitered the email', () => {
      // Check the login before regsiter the email
      const emailtest = 'tip-number@mtwxiidq.mailosaur.net';
      cy.visit('https://app.formcarry.com/login');
      cy.get('#email').type(emailtest);
      cy.get('#password').type(emailtest);
      cy.get("button[type='submit']").click();
      //Toast messge
      cy.get('.go318386747')
        .should('contain', 'Logged in, redirecting');
        cy.get('.eHYJWa', { timeout: 10000 })
        .should('be.visible')
        .should('have.text', "Let's create your first form!");
    });
  });
});  
