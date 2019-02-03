// To deploy run: firebase deploy --only functions

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import functions = require('firebase-functions');

import express = require('express');
import cors = require('cors');

import axios = require('axios');
const URL = 'https://api.prosperworks.com/developer_api/v1/people/';
const headers = getHeaders();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const put = (request, response) => {
  const copperUser = request.body;
  axios.default
    .put(`${URL}${copperUser.id}`, copperUser, { headers })
    .then(res => {
      console.error('SUCCESS', res.data);
      response.send(200, {});
    })
    .catch(error => {
      console.error('FAILURE', error);
      response.send(500, error);
    });
};

function getHeaders() {
  return {
    ['X-PW-AccessToken']: 'bc8a156103aa52f9fa85fa68b8a8cae5',
    ['X-PW-UserEmail']: 'joe.chapman3737@gmail.com',
    ['X-PW-Application']: 'developer_api',
  };
}

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// build multiple CRUD interfaces:
app.put('/', put);
app.options('/', (req, res) => res.send(200));

// Expose Express API as a single Cloud Function:
export const copperPerson = functions.https.onRequest(app);
