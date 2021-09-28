const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");
const app = express();

app.use(express.json());

const rollbar = new Rollbar({
  accessToken: "da412e2318b1480fb5a4e374174ddf9a",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
  rollbar.info("HTML was monitored successfully");
});

//STUDENTS STUFF

const studentArr = [];

app.post("/api/students", (req, res) => {
  const { name } = req.body;
  studentArr.push(name);

  rollbar.log("student successfully added!");
  res.status(200).send(studentArr);
});

app.post("/api/food", (req, res) => {
  try {
    const { food } = req.body;
    studentArr.push(food);
    console.log("does not exist");
  } catch (err) {
    rollbar.warning("does not exist");
  }
});

const port = process.env.PORT || 5656;

app.use(rollbar.errorHandler());

app.listen(port, () =>
  console.log(`Hippity Hoppity your server is opening on port: ${port}`)
);
