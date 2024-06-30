import * as admin from "firebase-admin";
/* eslint-disable @typescript-eslint/no-var-requires */
const serviceAccount = require("../../service-account.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default firebaseAdmin;
