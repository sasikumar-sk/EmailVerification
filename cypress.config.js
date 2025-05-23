const { defineConfig } = require("cypress");




const Mailosaur = require('mailosaur');

module.exports = {
  e2e: {
    "experimentalStudio": true,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on('task', {
        clearEmails() {
          const apiKey = 'wItW8shfZhxYyRInRchBELNEH3QX0O7i';
          const serverId = 'mtwxiidq';
          const mailosaur = new Mailosaur(apiKey);

          return mailosaur.messages.deleteAll(serverId).then(() => {
            return null;
          });
        }
      });
    }
  }
}



module.exports = {
  e2e: {
    env: {
      MAILSLURP_API_KEY: 'wItW8shfZhxYyRInRchBELNEH3QX0O7i',
    },
  },
};
