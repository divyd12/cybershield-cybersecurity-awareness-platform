const express = require("express");
const cors = require("cors");
const fs = require("fs");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Cyber Awareness Portal API Running");
});

app.get("/api/quizzes", (req, res) => {
  const quizzes = JSON.parse(
    fs.readFileSync("./data/quizzes.json")
  );

  res.json(quizzes);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});