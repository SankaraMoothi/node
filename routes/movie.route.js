import express from "express";
import { auth } from "../middlewares/auth.js";
const router = express.Router();
import {
  getAllMovies,
  getMovieById,
  deleteMovieById,
  AddMovie,
  editMovieById,
} from "../service/movie.service.js";
router.get("/", async function (request, response) {
  const movie = await getAllMovies();
  response.send(movie);
});
// router.get("/:id", function (request, response) {
//   const { id } = request.params;
//   const one = movie.find((element) => element.id === id);
//   response.send(one);
// });
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await getMovieById(id);
  res.send(movie);
});
router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await deleteMovieById(id);
  res.send(movie);
});
router.post("/Addmovies", async function (req, res) {
  const data = req.body;
  const movie = await AddMovie(data);
  res.send(movie);
});
router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const movie = await editMovieById(id, data);
  res.send(movie);
});
export default router;
