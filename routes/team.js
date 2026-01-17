import express from 'express';
import TeamMember from '../models/TeamMember.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/team
// @desc    Get all team members
// @access  Public
router.get('/', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ createdAt: -1 });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/team
// @desc    Create a new team member
// @access  Private
router.post('/', protect, async (req, res) => {
  const { name, title, about, image, type } = req.body;

  if (!['present', 'past'].includes(type)) {
    return res.status(400).json({ message: 'Invalid type specified.' });
  }

  try {
    const newMember = new TeamMember({
      name,
      title,
      about,
      image,
      type,
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/team/:id
// @desc    Update a team member
// @access  Private
router.put('/:id', protect, async (req, res) => {
    const { name, title, about, image, type } = req.body;
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        member.name = name;
        member.title = title;
        member.about = about;
        member.image = image;
        member.type = type;

        const updatedMember = await member.save();
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/team/:id
// @desc    Delete a team member
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        await member.deleteOne();
        res.json({ message: 'Team member removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;