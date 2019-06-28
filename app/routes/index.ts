import * as express from "express";
const router = express.Router();

router.get("/", (_req: express.Request, res: express.Response) => {
  return res.status(200).send("hay! this is it");
});

export default router;