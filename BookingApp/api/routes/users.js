import express from "express";

const router = express();

router.get("/", (req, res) => {
  res.send("hello from users route");
});

export default router;
