import express from "express";
import { auth } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";
const router = express.Router();
import {
  getAllMovies,
  getMovieById,
  deleteMovieById,
  AddMovie,
  editMovieById,
} from "../service/movie.service.js";
import { getUserById, getUserByName } from "../service/User.Services.js";
router.get("/", async function (request, response) {
  const movie = await getAllMovies();
  response.send(movie);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await getMovieById(id);
  res.send(movie);
});
router.delete("/:id", async function (req, res) {
  const { id } = req.params;

  const { token } = req.headers;
  const userauth = jwt.verify(token, process.env.SECRET_KEY);
  if (!userauth) {
    res.status(400).json("Not Allowed To Delete Or Edit");
  }
  const userId = userauth.id;

  const movie = await deleteMovieById(id, userId);
  res.send(movie);
});
router.post("/Addmovies", auth, async function (req, res) {
  const data = req.body;
  const { token } = req.body[0];
  const userauth = jwt.verify(token, process.env.SECRET_KEY);
  if (!userauth) {
    res.status(400).json("Not Allowed To Delete Or Edit");
  }

  const userId = userauth.id;
  const nameOfUser = await getUserById(userId);
  data?.forEach((object) => {
    object.userId = userId;
    object.userName = nameOfUser.name;
    delete object["token"];
  });

  const movie = await AddMovie(data);
  res.send(movie);
});
router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const { token } = req.body;
  const userauth = jwt.verify(token, process.env.SECRET_KEY);
  if (!userauth) {
    res.status(400).json("Not Allowed To Delete Or Edit");
  }
  const userId = userauth.id;

  const movie = await editMovieById(id, data, userId);
  res.send(movie);
});
export default router;
