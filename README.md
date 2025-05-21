📧 Formspree Email Verification Automation

This Cypress project automates the end-to-end workflow of:

- **Registering a new user on Formspree**
- **Receiving the email via Mailinator**
- **Verifying the email content across multiple tabs (HTML, Text, JSON, SMTP)**
- **Extracting verification links**
- **Re-sending email verification from Formspree dashboard**

## 🚀 Tech Stack

- [Cypress](https://www.cypress.io/) for test automation
- [Faker](https://github.com/faker-js/faker) for dynamic user data generation
- [Mailinator](https://mailinator.com) for public inbox email retrieval
- Git + GitHub for version control

---

## ✨ Features Automated

### 🔐 1. **User Registration (Formspree)**
- Generates random user data using `@faker-js/faker`
- Uses a public email inbox (Mailinator)
- Registers a user with verification link sent to Mailinator

### 📬 2. **Email Verification**
- Accesses Mailinator inbox
- Verifies sender and subject line
- Checks content in:
  - **HTML tab** – Extracts the verification link
  - **TEXT tab** – Confirms textual contents and verification info
  - **JSON tab** – Validates `from`, `to`, and `subject`
  - **Links tab** – Extracts clickable verification links
  - **SMTP log tab** – Ensures mail delivery (`250 OK`, `QUIT`)

### 🔁 3. **Resend Email Verification**
- Logs into Formspree
- Navigates to **Linked Emails**
- Clicks resend icon
- Validates toast message: `verification email re-sent`

### 🧹 4. **Email Cleanup**
- Deletes email from Mailinator inbox
- Verifies that the inbox is now empty
- 
---

## 🔧 Setup Instructions

### Clone the repo

 
git clone https://github.com/sasikumar-sk/EmailVerification.git
cd EmailVerification

### Install dependencies

npm install
### Configure environment variables

You can set up environment values in cypress.config.js or cypress.env.json:
 
{
  "EMAIL_ADDRESS": "hey132@mailinator.com",
  "Searchword": "hey132"
}

### Run tests
npx cypress open

---

🔍 Sample Test Scenarios

✅ Registration completes with random user data

✅ Email received in Mailinator within timeout

✅ Verification link can be extracted from HTML and TEXT tabs

✅ SMTP logs confirm email was sent successfully

✅ JSON structure of the email is valid

✅ User can resend verification link from Formspree dashboard

✅ Old emails are removed from inbox

---

👥 Contributors
Sasikumar – QA Engineer
@Pratheepa – QA Engineer

