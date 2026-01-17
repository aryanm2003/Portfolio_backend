import express from 'express';
import Publication from '../models/Publication.js';
import SubjectwisePublication from '../models/SubjectwisePublication.js'; // Also comment this out
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Year-wise Routes (Existing) ---
router.get('/yearwise', async (req, res) => {
  try {
    const publications = await Publication.find().sort({ year: -1 });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/yearwise', protect, async (req, res) => {
    const { title, year,link, category } = req.body;
    try {
      const newPublication = new Publication({ title, year,link, category });
      const savedPublication = await newPublication.save();
      res.status(201).json(savedPublication);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/yearwise/:id', protect, async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    await publication.deleteOne();

    res.json({ message: 'Publication removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/subjectwise', async (req, res) => {
  try {
    const publications = await SubjectwisePublication.find().sort({ year: -1 });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/subjectwise', protect, async (req, res) => {
  const { title, year, category, description, link, image } = req.body;

  try {
    const newPublication = new SubjectwisePublication({
      title,
      year,
      category,
      description,
      link,
      image,
    });

    const publication = await newPublication.save();
    res.status(201).json(publication);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/subjectwise/:id', protect, async (req, res) => {
    const { title, year, category, description, link, image } = req.body;
    try {
        const publication = await SubjectwisePublication.findById(req.params.id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        publication.title = title;
        publication.year = year;
        publication.category = category;
        publication.description = description;
        publication.link = link;
        publication.image = image;

        const updatedPublication = await publication.save();
        res.json(updatedPublication);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/publications/subjectwise/:id
// @desc    Delete a subject-wise publication
// @access  Private
router.delete('/subjectwise/:id', protect, async (req, res) => {
    try {
        const publication = await SubjectwisePublication.findById(req.params.id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        await publication.deleteOne();
        res.json({ message: 'Publication removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});




export default router;