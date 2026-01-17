import mongoose from 'mongoose';

const subjectwisePublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "MHD Turbulence",
      "Turbulence Convection",
      "Turbulence (Misc)",
      "Nonequilibrium Statmech",
      "HPC",
    ],
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const SubjectwisePublication = mongoose.model('SubjectwisePublication', subjectwisePublicationSchema);

export default SubjectwisePublication;