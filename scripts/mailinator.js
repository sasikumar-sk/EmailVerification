const axios = require('axios');

async function getVerificationLink(inbox) {
  // 1. Fetch inbox messages
  const inboxRes = await axios.get(`https://www.mailinator.com/api/v2/inbox?to=${inbox}`);
  const messages = inboxRes.data.messages;
  if (!messages.length) throw new Error('No email found in inbox');

  // 2. Get the latest message
  const messageId = messages[0].id;
  const messageRes = await axios.get(`https://www.mailinator.com/api/v2/email?id=${messageId}`);
  const emailBody = messageRes.data.data.parts[0].body;

  // 3. Extract the first link from the email body
  const linkMatch = emailBody.match(/https?:\/\/[^\s"]+/);
  if (!linkMatch) throw new Error('No link found in email');
  return linkMatch[0];
}

module.exports = { getVerificationLink };
