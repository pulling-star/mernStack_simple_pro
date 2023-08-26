import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import movies from "./routes/movies.js";
import users from "./routes/users.js";
import cors from "cors";
import path from "path";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const CONNECTIONURL =
  "mongodb+srv://ahmedreda:721996@cluster0.9xx4ecc.mongodb.net/recommendation_movies?retryWrites=true&w=majority";

app.use("/api/movies", movies);
app.use("/api/users", users);
const __dirname = path.resolve();

if (true) {
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("API Running"));
}

mongoose.set("useFindAndModify", false);
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL || CONNECTIONURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
