import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: { // This will be the short preview content
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  fullContent: { // This will be the full HTML content for the blog post
    type: String,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;