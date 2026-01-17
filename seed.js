import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});

    // The password to be hashed
    const plainPassword = 'SML@103E';

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // Create the new admin user with the hashed password
    const adminUser = new User({
      email: 'mahendrakv@gmail.com',
      password: hashedPassword, 
    });

    await adminUser.save();

    console.log('✅ Admin user created with hashed password!');
  
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedUser();