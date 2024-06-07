const admin = require("../config/firebase.js");

const firebaseAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const idToken = authHeader.split(" ")[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error("Error verifying Firebase ID token:", error);
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    console.error("No Firebase ID token found in Authorization header");
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = firebaseAuthMiddleware;
