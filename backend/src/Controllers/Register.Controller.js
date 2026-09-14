import User from '../Models/User.Models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function registerController(req, res) {

  try {
    const { fullName, email, password, phone } = req.body;

    // 1. Validate input fields
    if (!fullName || !phone || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User with this phone already exists." });
    }

    // 3. Hash the password for security
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create and save the new user
    const newUser = new User({
      fullName,
      phone,
      email,
      password: hashedPassword
    });

    await newUser.save();

     // 5. Generate a JWT Token
    // Replace 'YOUR_JWT_SECRET_KEY' with a real secret string in your .env file
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET
    );

    // 6. Set token in HTTP-Only Cookie
    res.cookie('token', token);

    // 5. Send success response (Exclude password from response)
    res.status(201).json({ 
      message: "User registered successfully!",
      user: { id: newUser._id, username: newUser.username, email: newUser.email }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

export default registerController