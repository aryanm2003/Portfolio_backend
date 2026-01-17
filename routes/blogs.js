import express from 'express';
import Blog from '../models/Blog.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    // We only send the fields needed for the main blogs list
    const blogs = await Blog.find().sort({ createdAt: -1 }).select('-fullContent');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get a single blog post by its slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog post
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, content, image, fullContent } = req.body;

  // Simple slug generation
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    const newBlog = new Blog({
      title,
      slug,
      content,
      image,
      fullContent,
    });

    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (error) {
    // Handle cases where the title/slug might not be unique
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A blog with this title already exists.' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});


// @route   PUT /api/blogs/:id
// @desc    Update a blog post
// @access  Private
router.put('/:id', protect, async (req, res) => {
    const { title, content, image, fullContent } = req.body;
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.title = title;
        blog.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        blog.content = content;
        blog.image = image;
        blog.fullContent = fullContent;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        await blog.deleteOne();
        res.json({ message: 'Blog removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;