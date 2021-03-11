import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import movies from "./routes/movies.js";
import users from "./routes/users.js";
import cors from "cors";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const CONNECTIONURL =
  "mongodb+srv://ahmedreda:721996@cluster0.eymbv.mongodb.net/recommendation_database?retryWrites=true&w=majority";

app.use("/api/movies", movies);
app.use("/api/users", users);
// app.use((err, req, res, next) => {
//   //  res.send(err.returnstatus);

//   // Sends response
//   return res.json({ message: err.message });
// });

app.get("/", (req, res) => res.send("API Running"));
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
