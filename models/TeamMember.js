import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['present', 'past'],
  },
}, { timestamps: true });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;