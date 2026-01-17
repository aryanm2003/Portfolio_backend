import express from 'express';
import Banner from '../models/Banner.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/banners
// @desc    Get all banners
// @access  Public
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/banners
// @desc    Create a new banner
// @access  Private
router.post('/', protect, async (req, res) => {
  const { imageUrl, description } = req.body;

  try {
    const newBanner = new Banner({
      imageUrl,
      description,
    });

    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    await banner.deleteOne(); // Mongoose 6+ uses deleteOne()

    res.json({ message: 'Banner removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});
export default router;