import dotenv from "dotenv";
dotenv.config();
import movieRouter from "./routes/movie.route.js";
import userRouter from "./routes/user.route.js";
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
const app = express();

const PORT = process.env.PORT;
// const mongo_url = "mongodb://127.0.0.1";
const mongo_url = process.env.MONGO_URL;

const client = new MongoClient(mongo_url);
client.connect();
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "https://mass-movie-hub.netlify.app",
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(cookieParser());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩!!!!!");
});
app.use(`/movie`, movieRouter);
app.use(`/user`, userRouter);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
export { client };
