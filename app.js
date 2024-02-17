import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev";

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    joke: "",
    delivery: "",
  });
});

app.post("/get-joke", async (req, res) => {
  try {
    const result = await axios.get(
      API_URL +
        "/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart"
    );
    res.render("index.ejs", {
      joke: result.data.setup,
      delivery: result.data.delivery,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500).send("Error fetching joke");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
