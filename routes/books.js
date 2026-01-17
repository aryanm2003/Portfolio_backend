import express from 'express';
import Book from '../models/Book.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', async (req, res) => {
  try {
    // We don't need the full book details for the list page
    const books = await Book.find().sort({ createdAt: -1 }).select('title slug image');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/books/:slug
// @desc    Get a single book by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/books
// @desc    Create a new book
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, about, image, buyLinks, reviews } = req.body;

  // --- Automatic Slug Generation ---
  // Creates a URL-friendly string like "the-cosmic-symphony"
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    const newBook = new Book({
      title,
      slug,
      about,
      image,
      buyLinks,
      reviews,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    if (error.code === 11000) {
        return res.status(400).json({ message: 'A book with this title already exists.' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', protect, async (req, res) => {
  const { title, about, image, buyLinks, reviews } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Generate a new slug from the title if it has changed
    const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    book.title = title;
    book.slug = newSlug;
    book.about = about;
    book.image = image;
    book.buyLinks = buyLinks;
    book.reviews = reviews;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.deleteOne();

    res.json({ message: 'Book removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;