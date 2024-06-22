import * as admin from "firebase-admin";
import serviceAccount from "../../service-account.json";

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default firebaseAdmin;