import express from 'express';
import Course from '../models/Course.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, image, docLink, content, category } = req.body;

  if (!['online', 'offline'].includes(category)) {
    return res.status(400).json({ message: 'Invalid category specified.' });
  }

  try {
    const newCourse = new Course({
      title,
      image,
      docLink,
      content,
      category,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Private
router.put('/:id', protect, async (req, res) => {
    const { title, image, docLink, content, category } = req.body;
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.title = title;
        course.image = image;
        course.docLink = docLink;
        course.content = content;
        course.category = category;

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        await course.deleteOne();
        res.json({ message: 'Course removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


export default router;