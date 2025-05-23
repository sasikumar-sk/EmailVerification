# 📧 **Formcarry Email Verification Automation**

This Cypress project automates the end-to-end workflow of:

- **Registering a new user on Formcarry**
- **Receiving the email via Mailosaur**
- **Verifying the email content**
- **Extracting the verification link**
- **Verifying the verification link**
- **Verifying the login process after registration**

## 🚀 **Tech Stack**

- [**Cypress**](https://www.cypress.io/) for test automation
- [**Cypress-MailSlurp**](https://www.npmjs.com/package/cypress-mailslurp) for Mailosaur email retrieval and validation
- [**Dayjs**](https://day.js.org/) for date manipulation and validation
- [**Git + GitHub**](https://github.com/) for version control

---

## ✨ **Features Automated**

### 🔐 **1. User Registration (Formcarry)**
- Registers a user on **Formcarry** using randomly generated data
- Sends a verification email to a **Mailosaur** email address
- Verifies the toast message displayed after registration

### 📬 **2. Email Verification (Mailosaur)**
- Logs into **Mailosaur**
- Checks the received verification email
- Extracts the verification link from the email
- Compares the email timestamp with the current date using `Dayjs`
- Validates the email structure (subject, sender,API payload,attachments  etc.)

### 🔁 **3. Verification Link Extraction**
- Extracts and follows the verification link from the **HTML** content in the email
- Validates that the Formcarry verification page shows a success message: `Your email is verified!`

### 🧹 **4. Email Cleanup**
- Deletes the verification email from Mailosaur after testing

---

## 🔧 **Setup Instructions**

### **Clone the repo**


git clone https://github.com/your-username/your-repository.git
cd your-repository

---

## 🔧 Setup Instructions

### Clone the repo

 
git clone https://github.com/sasikumar-sk/EmailVerification.git
cd EmailVerification

### Install dependencies

npm install
```json
### Configure environment variables

You can set up environment values in cypress.config.js or cypress.env.json:
 
{
  "EMAIL_ADDRESS": "hey132@mailinator.com",
  "Searchword": "hey132",
  "EMAIL_ADDRESS1": "hey13245@mailinator.com",
  "Searchword1": "hey13245",
}
``` 

### Run tests
npx cypress open

---
### Sample Test Scenarios

✅ Before Registration – Test the user login with test email

✅ User Registration – Registers a new user on Formcarry with a test email and password.

✅ Email Received in Mailosaur – Checks if the verification email is received within the timeout period.

✅ Verification Link Extraction – Extracts and follows the verification link in the HTML email.

✅ Verification Link – Open the Verification link and confrim Verification successfully

✅ Email Content Validation – Ensures that the email contains correct content such as sender, subject, and timestamp.

✅ Login After Registration – Verifies that the user can log in successfully after email verification.

✅ Email Cleanup – Deletes the test email from Mailosaur after testing.


🧑‍🤝‍🧑 Contributors
-Sasikumar – QA Engineer
-Pratheepa – QA Engineer


