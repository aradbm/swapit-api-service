import * as admin from "firebase-admin";
import serviceAccount from "../../service-account.json";

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.toString()),
});

export default firebaseAdmin;