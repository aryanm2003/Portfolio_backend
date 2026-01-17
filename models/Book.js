import mongoose from 'mongoose';

// Sub-schema for buy links
const buyLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

// Sub-schema for reviews
const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  text: { type: String, required: true },
});

const bookSchema = new mongoose.Schema({
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
  about: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  buyLinks: [buyLinkSchema],
  reviews: [reviewSchema],
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;