// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
import admin = require('firebase-admin');
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
