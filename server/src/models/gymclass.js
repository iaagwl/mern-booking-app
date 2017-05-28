import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const AttendeesSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  }
});

const ClassSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  maxspots: {
    type: String,
    required: true
  },
  spots: {
    type: String,
    required: true
  },
  attendees: {
    type: [AttendeesSchema],
    default: []
  }
});

const GymClass = mongoose.model('gymclasses', ClassSchema);

module.exports = GymClass;
