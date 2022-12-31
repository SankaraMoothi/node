import * as dotenv from "dotenv";
dotenv.config();

const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const PORT = 4000;
// const mongo_url = "mongodb://127.0.0.1";
const mongo_url = process.env.MONGO_URL;

const client = new MongoClient(mongo_url);
client.connect();
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩!!!!!");
});
app.get("/movie", async function (request, response) {
  const movie = await client
    .db("movie-data")
    .collection("movies")
    .find({})
    .toArray();
  response.send(movie);
});
// app.get("/movie/:id", function (request, response) {
//   const { id } = request.params;
//   const one = movie.find((element) => element.id === id);
//   response.send(one);
// });
app.get("/movie/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await client
    .db("movie-data")
    .collection("movies")
    .findOne({ id: id });
  res.send(movie);
});
app.delete("/movie/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await client
    .db("movie-data")
    .collection("movies")
    .deleteOne({ id: id });
  res.send(movie);
});
app.post("/Addmovies", async function (req, res) {
  const data = req.body;
  const movie = await client
    .db("movie-data")
    .collection("movies")
    .insertMany(data);
  res.send(movie);
});
app.put("/movie/:id", async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const movie = await client
    .db("movie-data")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
  res.send(movie);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
