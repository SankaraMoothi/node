import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import {
  getAllUsers,
  createUsers,
  deleteUserById,
  getUserByName,
} from "../service/User.Services.js";
import jwt from "jsonwebtoken";

router.get("/", async function (request, response) {
  const user = await getAllUsers();
  response.send(user);
});
router.post("/singUp", async (req, res) => {
  const { name, pass } = req.body;
  const userFromDB = await getUserByName(name);
  if (userFromDB) {
    res.status(400).send({ message: "user Already Exist" });
  } else {
    const hashedPassword = await generateHashedPass(pass);
    const data = [{ name, password: hashedPassword }];
    const user = await createUsers(data);
    res.status(200).send(user);
  }
});
router.delete("/:id", async function (req, res) {
  const { id } = req.params;

  const user = await deleteUserById(id);

  res.send(user);
});
router.post("/login", async (req, res) => {
  const { name, pass } = req.body;

  const userFromDB = await getUserByName(name);
  if (!userFromDB) {
    res.status(400).send({ message: "invalid credentials" });
  } else {
    const storedDBPassword = userFromDB.password;
    const isPasswordCheck = await bcrypt.compare(pass, storedDBPassword);
    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);

      res
        .status(200)
        .cookie("token", token, { sameSite: "none", secure: true })
        .json({ id: userFromDB._id });
    } else {
      res.status(400).send({ message: "invalid credentials" });
    }
  }
});
export default router;
async function generateHashedPass(pass) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
}
