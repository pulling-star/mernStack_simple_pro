import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "movie" }],
  date: { type: Date, default: Date.now },
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatched) => {
      if (err) {
        return reject(err);
      }
      if (!isMatched) {
        return reject(false);
      }
      return resolve(true);
    });
  });
};
const User = mongoose.model("user", UserSchema);
export default User;