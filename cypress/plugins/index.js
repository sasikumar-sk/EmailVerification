const { getVerificationLink } = require('./scripts/mailinator');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async getMailinatorVerificationLink({ inbox }) {
          return await getVerificationLink(inbox);
        }
      });
    },
  },
};
