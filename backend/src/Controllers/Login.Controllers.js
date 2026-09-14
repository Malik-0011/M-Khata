import User from '../Models/User.Models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function loginController(req, res) {

   try {
    const { phone, password } = req.body;

    // 1. Validate input fields
    if (!phone || !password) {
      return res.status(400).json({ message: "Please enter both email and password." });
    }

    // 2. Find user by email
    const user = await User.findOne({ phone });
    if (!user) {
      // Generic message prevents attacker enumeration
      return res.status(400).json({ message: "Invalid phone number or password." });
    }

    // 3. Check if password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // 4. Generate a JWT Token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.JWT_SECRET || 'YOUR_JWT_SECRET_KEY'
    );

    // 5. Set token in HTTP-Only Cookie
    res.cookie('token', token);

    // 6. Send success response
    res.status(200).json({
      message: "Login successful!",
      user: { id: user._id, fullName: user.fullName, phone: user.phone }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default loginController