import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Import bcrypt
import User from '../models/User.js';
import Feedback from '../models/Feedback.js';

const router = express.Router();

const JWT_SECRET = 'your_super_secret_key_for_jwt';

router.post('/send-feedback', async (req, res) => {
  const { email, suggestion } = req.body;

  try {
    const admin = await User.findOne({ email });

    // Check if an admin user exists with that email
    if (admin) {
      // Securely compare the provided password with the hashed password in the DB
      const isMatch = await bcrypt.compare(suggestion, admin.password);

      if (isMatch) {
        // If passwords match, create and send JWT
        const token = jwt.sign(
          { id: admin._id, email: admin.email },
          JWT_SECRET,
          { expiresIn: '20m' }
        );
        return res.status(200).json({ token });
      }
    }

    // If no admin found or password doesn't match, save it as feedback
    const newFeedback = new Feedback({ email, suggestion });
    await newFeedback.save();
    
    return res.status(201).json({ message: 'Thank you for your feedback!' });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'An error occurred on the server.' });
  }
});

export default router;