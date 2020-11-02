require("dotenv").config();
let admin = require("firebase-admin");

// TODO: Change with your admin sdk
let serviceAccount = require("./playground-2c9cd-firebase-adminsdk-sx1b5-554c3452c9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_DATABASE,
  storageBucket: process.env.STORAGE_BUCKET,
});

module.exports = admin