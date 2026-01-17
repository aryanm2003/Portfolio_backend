import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import publicationRoutes from './routes/publications.js'; 
import blogRoutes from './routes/blogs.js';
import talksArticlesRoutes from './routes/talksArticles.js';
import courseRoutes from './routes/courses.js';
import teamRoutes from './routes/team.js';
import bookRoutes from './routes/books.js';
import bannerRoutes from './routes/banners.js';
import path from 'path';
import uploadRoute from './routes/upload.js';
import { fileURLToPath } from 'url';

// Connect to MongoDB
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/publications', publicationRoutes); // This will now work correctly
app.use('/api/blogs', blogRoutes);
app.use('/api/talks-articles', talksArticlesRoutes);
app.use('/api/courses', courseRoutes); 
app.use('/api/team', teamRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/banners', bannerRoutes);

app.use('/api/upload', uploadRoute);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));