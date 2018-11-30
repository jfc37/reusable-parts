/**
@param {object} user - The user being created
@param {string} user.id - user id
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} user.user_metadata - user metadata
@param {object} user.app_metadata - application metadata
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
module.exports = function(user, context, cb) {
  const URL = 'https://api.prosperworks.com/developer_api/v1/people';
  const copperUser = getCopperUser(user);
  const headers = getHeaders();

  const axios = require('axios');

  axios
    .post(URL, copperUser, { headers })
    .then(response => {
      console.log('SUCCESS', response);
      cb();
    })
    .catch(error => {
      console.log('ERROR', error);
      cb();
    });
};

function getCopperUser(user) {
  return {
    name: user.email,
    emails: [
      {
        email: user.email,
      },
    ],
    phone_numbers: [],
  };
}

function getHeaders() {
  return {
    ['X-PW-AccessToken']: '3150a263724e1acaf24b651f7b68c661',
    ['X-PW-Application']: 'developer_api',
    ['X-PW-UserEmail']: 'joe.chapman3737@gmail.com',
  };
}
