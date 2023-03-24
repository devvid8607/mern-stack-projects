import express from "express";

const router = express();

router.get("/", (req, res) => {
  res.send("hello from auth route");
});

export default router;
