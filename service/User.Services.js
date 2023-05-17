import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function deleteUserById(id) {
  return await client
    .db("movie-data")
    .collection("users")
    .deleteOne({ _id: ObjectId(id) });
}
export async function getAllUsers() {
  return await client.db("movie-data").collection("users").find({}).toArray();
}
export async function createUsers(data) {
  return await client.db("movie-data").collection("users").insertMany(data);
}
export async function getUserByName(id) {
  return await client
    .db("movie-data")
    .collection("users")
    .findOne({ _id: ObjectId(id) });
}
