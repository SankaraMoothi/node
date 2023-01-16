import { client } from "../index.js";

export async function editMovieById(id, data) {
  return await client
    .db("movie-data")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
export async function AddMovie(data) {
  return await client.db("movie-data").collection("movies").insertMany(data);
}
export async function deleteMovieById(id) {
  return await client
    .db("movie-data")
    .collection("movies")
    .deleteOne({ id: id });
}
export async function getMovieById(id) {
  return await client.db("movie-data").collection("movies").findOne({ id: id });
}
export async function getAllMovies() {
  return await client.db("movie-data").collection("movies").find({}).toArray();
}
