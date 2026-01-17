import express from 'express';
import TalkArticle from '../models/TalkArticle.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/talks-articles
// @desc    Get all talks and articles
// @access  Public
router.get('/', async (req, res) => {
  try {
  const items = await TalkArticle.find().sort({ createdAt: -1 });
  res.json(items);
} catch (error) {
  res.status(500).json({ message: 'Server Error' });
}
});

// @route   POST /api/talks-articles
// @desc    Create a new talk or article
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, content, image, docLink, type } = req.body;

  // Basic validation
  if (!['talk', 'article'].includes(type)) {
    return res.status(400).json({ message: 'Invalid type specified.' });
  }

  try {
    const newItem = new TalkArticle({
      title,
      content,
      image,
      docLink,
      type,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', protect, async (req, res) => {
    const { title, content, image, docLink, type } = req.body;
    try {
        const item = await TalkArticle.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.title = title;
        item.content = content;
        item.image = image;
        item.docLink = docLink;
        item.type = type;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/talks-articles/:id
// @desc    Delete a talk or article
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const item = await TalkArticle.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await item.deleteOne();
        res.json({ message: 'Item removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
export default router;