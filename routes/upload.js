import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // We want to save files in the 'public/uploads' directory
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Create a unique filename: fieldname-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private (add 'protect' middleware back if you need it)
router.post('/', upload.single('image'), (req, res) => {
  // 'upload.single('image')' means we expect a single file in a form field named 'image'

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // If upload is successful, req.file will be available.
  // We return the URL to the file.
  res.json({
    message: 'File uploaded successfully',
    // This is the public URL to the file
    imageUrl: `${req.file.filename}` 
    // IMPORTANT: When you deploy, change this to:
    // imageUrl: `https://your-domain.com/uploads/${req.file.filename}`
  });
});

export default router;