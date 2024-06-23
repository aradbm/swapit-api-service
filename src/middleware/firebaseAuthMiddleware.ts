import firebaseAdmin from "../config/firebase";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: string | null;
 }
 

const firebaseAuth = async (req: Request, res: Response, next: NextFunction ) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const idToken = authHeader.split(" ")[1];
    try {
      const decodedToken = await firebaseAdmin!.auth().verifyIdToken(idToken);
      (req as CustomRequest).token = decodedToken.uid;
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

export default firebaseAuth;
