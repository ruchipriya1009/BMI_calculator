const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
async function createUser(name, email, password) {
  try {
   

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return { message: "User registered successfully" };
  } catch (error) {
    throw new Error("Failed to register user");
  }
}

async function loginUser(email, password) {
  try {
    // Find the user by email
    console.log(email,password);
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
  const token = jwt.sign({ userId: user._id }, "secretKey", {
    expiresIn: "1h",
  });

      user.tokenExpiration = Date.now() + 3600000; // 1 hour expiration
      await user.save();

      return { message: "Login successful", token,name:user.name,email:user.email,userId:user._id };
  
  } catch (error) {
    throw new Error(error);
  }
}

async function logoutUser(email) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Clear the token expiration in the user model
    user.tokenExpiration = null;
    await user.save();

    return { message: "Logout successful" };
  } catch (error) {
    throw new Error("Failed to log out");
  }
}

module.exports = { createUser ,loginUser,logoutUser};
