import User from "../models/User.js";
import express from "express";
import checkAPIs from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
const { check, validationResult } = checkAPIs;

const router = express.Router();

//  @route  Get api/auth
//  @desc   Test route
//  @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user_id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//  @route  Post api/users/signup
//  @desc   Register route
//  @access Public
router.post(
  "/signUp",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ error: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        password,
        avatar,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //   const payload = { user: { id: user.id } };
      jwt.sign(
        { user_id: user._id },
        // config.get("jwtSecret"),
        "mysecrettoken", // This is the secret token that encrypt the password
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //   res.send("User registered");
    } catch (error) {
      console.log(error.message);
      res.status("500").send("Server error  ");
    }
  }
);

//  @route  Post api/users/signin
//  @desc   signin route
//  @access Public
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "Email not found" }] });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid password or email" }] });
    }

    const token = jwt.sign({ user_id: user._id }, "mysecrettoken");
    res.send({ token });
  } catch (error) {
    console.log(error.message);
    res.status("500").send("Server error  ");
  }
});
export default router;
