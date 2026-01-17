import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  link:{
    type:String,
    required:false,
  },
  category: {
    type: String,
    required: true,
    enum: ['Journal', 'Review Paper', 'Conference Proceedings'],
  },
});

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;