import mongoose from 'mongoose';

const talkArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  docLink: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['talk', 'article'], // Ensures the type is one of these two values
  },
}, { timestamps: true });

const TalkArticle = mongoose.model('TalkArticle', talkArticleSchema);

export default TalkArticle;