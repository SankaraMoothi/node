import { ObjectId } from "mongodb";
import { client } from "../index.js";

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
export async function getUserByName(name) {
  return await client
    .db("movie-data")
    .collection("users")
    .findOne({ name: name });
}
export async function getUserById(id) {
  return await client
    .db("movie-data")
    .collection("users")
    .findOne({ _id: ObjectId(id) });
}
