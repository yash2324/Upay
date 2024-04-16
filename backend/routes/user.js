const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { User } = require("../db");
const router = Router();
require("dotenv").config();

const signupBod = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
router.post("/signup", async (req, res) => {
  const { success } = signupBod.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "email already exists",
    });
  }
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWTSECRET
  );
  res.json({
    message: "User Created Successfuly",
    token: token,
  });
});

const signinBod = z.object({
  username: z.string().email(),
  password: z.string(),
});
router.post("/signin", async (req, res) => {
  const { success } = signinBod.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWTSECRET
    );
    res.json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});

module.exports = router;
