import { Router } from "express";
const router: Router = Router();
// const db = require("./config/postgresDB");
import db from "./config/postgresDB";
import { Request, Response } from "express";
import { redisClient } from "./config/redisDB";

router.get("/health", async (_req: Request, res: Response) => {
  try {
    // Check postgres connectivity
    await db.query("SELECT 1");
    // Check Redis connectivity, set and get key Arad
    await redisClient.set("test", "success");
    const testRes = await redisClient.get("test");
    if (testRes !== "success") {
      throw new Error("Redis key test is not set");
    }

    res.status(200).send(
      "<div style='display: flex; justify-content: center; align-items: center;'> \
          Server, database, and Redis are all connected \
          </div>"
    );
  } catch (error) {
    console.error("Connectivity error:", error);
    res.status(500).json({ status: "ERROR", message: "Connectivity issue" });
  } finally {
    await redisClient.del("test");
  }
});

router.get("/", (_req: Request, res: Response) => {
  // have html with a boton, when pressed it goes to api/categories
  res.send(
    "<div style='display: flex; justify-content: center; align-items: center;'> \
        <a href='/api/categories'>Go to categories</a> \
      </div>"
  );
});

export default router;
