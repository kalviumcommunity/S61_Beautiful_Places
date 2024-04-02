const express = require("express");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("./UserSchema");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
// Register endpoint
// Register endpoint
userRoute.post("/register", async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email address already in use' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await UserModel.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        });

        res.status(200).json({ message: "Registration successful.", newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        if (error.code === 11000 && error.keyPattern.email) {
            // Duplicate email error
            return res.status(409).json({ error: 'Email address already in use' });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});



// Login endpoint
// Login endpoint
userRoute.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If username and password are correct, generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Logout endpoint
userRoute.post("/logout", async (req, res) => {
    try {
      // Implement logout functionality here (if needed)
      res.clearCookie("token"); // Clear the "token" cookie
      res.status(200).send("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  });
  

module.exports = userRoute;