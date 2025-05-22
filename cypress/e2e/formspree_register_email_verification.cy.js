
import { faker } from '@faker-js/faker';
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Failed to execute \'send\' on \'WebSocket\'')) {
    return false;  
  }
});
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('ResizeObserver loop')) {
    return false;  
  }
});

describe('Formspree Login and Resend Verification Email', () => {
  it('Logs in and resends verification email', () => {
    const email = 'hey132@mailinator.com';
    const password = 'Hey132@mailinator.com';

    // Visit the login page
    cy.visit('https://formspree.io/login',{ timeout: 25000 });

    // Fill in credentials
    cy.get('#email-address').type(email);
    cy.get('#password').type(password);

    //  Submit login
    cy.get('.buttonPrimary').click();

    //  Wait for redirection to /forms
    cy.url({ timeout: 20000 }).should('include', '/forms');
    // Click on Account link in header
    cy.contains('Account', { timeout: 20000 }).click(); 

    // Step 7: Click the SVG resend icon to trigger the email
    cy.get('svg[aria-hidden="true"].primaryLink.cursor-pointer').click();

    // Step 8: Check toast message
    cy.get('.toastify.toast-success')
      .should('be.visible')
      .and('contain.text', `${email} verification email re-sent.`);
  });
});

 
 /*
describe('Formspree Registration Automation', () => {
 it('Registers a user with a temp email', () => {
     const email = Cypress.env('EMAIL_ADDRESS');
 
     cy.visit('https://formspree.io/register');
     cy.get('form', { timeout: 20000 }).should('be.visible');
     // Fill out the form
     const firstName = faker.person.firstName();
     const lastName = faker.person.lastName();
     cy.get('fieldset.gap-y-6 > .grid > :nth-child(1) > .flex').type(firstName);
     cy.get('fieldset.gap-y-6 > .grid > :nth-child(2) > .flex').type(lastName);
     cy.writeFile('cypress/fixtures/userData.json', {
      firstName,
      lastName,
    });
     cy.get('fieldset.gap-y-6 > :nth-child(2) > .flex').type(email);
     cy.get(':nth-child(3) > .flex-col > .rounded').type('SecureP@ssword123');
 
     // Check the required checkboxes
     cy.get('.gap-y-2 > :nth-child(1)').click();
      
 
     cy.get('.gap-y-2 > :nth-child(2)').click();
 
     // Click Register button
     cy.get('.buttonPrimary').click();
 
    cy.pause();
    cy.get(':nth-child(1) > .gap-y-10', { timeout: 30000 })
      .should('contain.text', `Welcome, ${firstName}Tell us about yourself.`);
     //cy.get(':nth-child(1) > .gap-y-10').contains("Welcome, John. Tell us about yourself.")
   }); 
    });
 */


  describe('Email verification for Formspree Registration ', () => {
    it('TEST 1- that the Formspree verification - Email TAB ', function () {
      cy.visit('https://www.mailinator.com/v4/public/inboxes.jsp');
      const Searchword = Cypress.env('Searchword');
      cy.get('#inbox_field').clear('h');
      cy.get('#inbox_field').type(Searchword);
      cy.get('.primary-btn').click();
      cy.get('.wrapper-table tr').eq(1).click();
      cy.get(':nth-child(1) > .from').should('have.text', '\n                    hey132\n                ');
      cy.get('.sender-info > :nth-child(2)').click();
      cy.get(':nth-child(2) > .from').should('have.text', '\n                    accounts@formspree.io\n                ');
      cy.get('.wrapper-title').click();
      cy.get('.gray-color').should('have.text', '\n                Action Required: Verify email linked to Formspree\n            ');

      //HTML
      cy.get('#pills-html-tab').should('be.visible');
      cy.get('#pills-html-tab').click();
      //  Access iframe and extract the Mailinator linker URL
      cy.getIframeBody('#html_msg_body')
        .contains('strong', 'Verify email')  // Find the text "Verify email"
        .parents('a')  
        .then(($a) => {
          const href = $a.attr('href'); // Extract the href attribute
          cy.log('Extracted verification link:', href);
        });
    });


    //TEXT TAB     
    it('TEST 2- verify the content - TEXT TAB', () => {
      cy.visit('https://www.mailinator.com/v4/public/inboxes.jsp?to=hey132');
      cy.get('.wrapper-table tr').eq(1).click();
      cy.get('#pills-textbuthtml-tab').should('be.visible');
      cy.get('#pills-textbuthtml-tab').click();

      cy.getIframeBody('#texthtml_msg_body')
        .contains('a', 'https://formspree.io/account/verify')
        .should('have.attr', 'href')
        .then((href) => {
          cy.log('Extracted Formspree verification link:', href);
          //Assert that the link includes "formspree.io/account/verify"
          expect(href).to.contain('formspree.io/account/verify');
          cy.contains('You have successfully added').should('exist');
          cy.contains('Each email address added to Formspree must be verified').should('exist');
          cy.contains('Verify Email').should('exist');
          cy.contains('Formspree Team').should('exist');
          cy.contains('team@formspree.io').should('exist');
        });
    });


    //JSON TAB
    it('TEST 3- extract and validate JSON from JSON TAB', () => {
      cy.visit('https://www.mailinator.com/v4/public/inboxes.jsp?to=hey132');
      cy.get('.wrapper-table tr').eq(1).click();
      cy.get('#pills-json-tab').should('be.visible').click();
      cy.get("#pills-json-content").should('be.visible').then(($jsonContent) => {
        // Extract the raw JSON from the content
        const jsonText = $jsonContent.text(); // Get the text content of the JSON tab
        const jsonData = JSON.parse(jsonText); // Parse it into a JavaScript object
        // Validate the extracted JSON data
        expect(jsonData.fromfull).to.match(/^.+@.+\..+$/); // Check if 'fromfull' is a valid email
        expect(jsonData.headers.subject).to.not.be.empty; // Ensure subject is not empty
        expect(jsonData.headers.from).to.not.be.empty; // Ensure 'from' is not empty
        expect(jsonData.headers.to).to.not.be.empty; // Ensure 'to' is not empty
        expect(jsonData.headers.from).to.include('accounts@formspree.io');
      });
    });


    //Links TAB
    it('TEST 4- click on the Links tab and verify the content', () => {
      cy.visit('https://www.mailinator.com/v4/public/inboxes.jsp?to=hey132');
      cy.get('.wrapper-table tr').eq(1).click();

      // Ensure the "Links" tab is visible and click it
      cy.get('#pills-links-tab').should('be.visible').click();  
      cy.get('#pills-links-content').should('be.visible').then(($linksContent) => {
        // Check the links inside the content and Validate table contains the "Formspree" and "Verify email" links
        cy.get('#pills-links-content table tbody tr').each(($row) => {
          cy.wrap($row).find('td').eq(1).find('a').then(($link) => {
            const linkText = $link.text().trim();
            const linkHref = $link.attr('href');

            // Verify the link text and URL for the expected values
            if (linkText.includes('Formspree')) {
              expect(linkHref).to.equal('https://formspree.io');
            } else if (linkText.includes('Verify email')) {
              expect(linkHref).to.include('https://formspree.io/account/verify?nonce=');
            }
          });
        });
      });
    }); 

    //SMTP TAB
    it('TEST 5- SMTP log tab and verify content', () => {
      cy.visit('https://www.mailinator.com/v4/public/inboxes.jsp?to=hey132');
      cy.get('.wrapper-table tr').eq(1).click();
      cy.get('#pills-smtplog-tab').should('be.visible').click(); // Click the "SMTP Log" tab 
      cy.get('#pills-smtplog-content').should('be.visible').then(($smtpLogContent) => {
        // Check for the outgoing log message with '250 Ok'
        cy.get('#pills-smtplog-content').contains('OUTGOING').should('exist');
        cy.get('#pills-smtplog-content').contains('250 Ok').should('exist');
        // Check for the incoming log message with 'QUIT'
        cy.get('#pills-smtplog-content').contains('INCOMING').should('exist');
        cy.get('#pills-smtplog-content').contains('QUIT').should('exist');

        //DELETE the email
        cy.get('.btn-delete.d-flex.align-items-center.text-decoration-none')
          .should('be.visible')
          .click();

        // Check if the #inbox_specified div is visible and should be Empty
        cy.reload();
        cy.get('a[title="hey132"]').should('be.visible').click(); 
        cy.wait(5000);
        cy.reload();
        
        cy.get('#inbox_specified')
        .should('contain.text', '[ This Inbox is Currently Empty ]');
  
      });
    });

  });
 

 