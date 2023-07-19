const UserService = require("../services/user.service");
const User=require('../models/user.model')
async function registerUser(req, res) {
  try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("Email already exists");
      }
    const { name, email, password } = req.body;
    console.log(name,email,password);
    const result = await UserService.createUser(name, email, password);
    res.status(201).json({message:`User with ${email} registered Successfully`});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
async function logout(req, res) {
  try {
    const { email } = req.body;
    const token = req.headers["authorization"];

  
    jwt.verify(token, "secretKey", async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }

      await AuthService.logoutUser(email);
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { registerUser,login,logout };
