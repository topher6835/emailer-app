const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => emailRegex.test(email) === false);

    if(invalidEmails.length) {
      return `Emails invalid: ${invalidEmails}`;
    }
    return;
};
