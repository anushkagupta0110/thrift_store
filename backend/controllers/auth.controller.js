// importing libraries
import UserActivation from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import generateToken from "../util/generateToken.js";

// registeing user
// route POST api/v1/auth/register
// @access public
const registerUser = asyncHandler(async (req, res) =>
{
  const { name, email, password } = req.body;

  const userExists = await UserActivation.findOne({ email });

  // throw error if user already exists
  if (userExists) {
    res.status(409);
    throw new Error("User already exists");
  }

  // creating user if user does not exist
  const user = await UserActivation.create({
    name,
    email,
    password,
  });

  // user creating successful or not
  if (user)
  {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }
  else
  {
    res.status(400);
    throw new Error("Invalid user");
  }
});

// logging in user
// route POST api/v1/auth/login
// @access public

const loginUser = asyncHandler(async (req, res) =>
{
  const { email, password } = req.body;

  const user = await UserActivation.findOne({ email });

  if (user && (await user.matchPassword(password)))
  {
    generateToken(res, user._id);
    res.status(200).json(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }
  else
  {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// logout user
// route POST api/v1/auth/logout
// @access public
const logOut = asyncHandler(async (req, res) =>
{
  console.log("logout");
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // clearing cookie
  res.status(200).json({
    message: "Logout successful",
  });
});

// eporting
export { logOut, loginUser, registerUser };