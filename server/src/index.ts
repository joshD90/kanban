import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("sever is up and running here");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
