// firebaseConfig.js
const admin = require("firebase-admin");
const serviceAccount = require("../swapit-app-942b1-firebase-adminsdk-5lvyi-f5eb27ccb6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
