import express from "express";

const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
