import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function editMovieById(id, data, userId) {
  return await client
    .db("movie-data")
    .collection("movies")
    .updateOne(
      { $and: [({ _id: ObjectId(id) }, { userId: userId })] },
      { $set: data }
    );
}
export async function AddMovie(data) {
  return await client.db("movie-data").collection("movies").insertMany(data);
}
export async function deleteMovieById(id, userId) {
  return await client
    .db("movie-data")
    .collection("movies")
    .findOneAndDelete({
      $and: [({ _id: ObjectId(id) }, { userId: userId })],
    });
}
export async function getMovieById(id) {
  return await client
    .db("movie-data")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}
export async function getAllMovies() {
  return await client.db("movie-data").collection("movies").find({}).toArray();
}
