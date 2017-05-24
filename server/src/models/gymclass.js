import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const GymClass = mongoose.model('gymclasses', ClassSchema);

module.exports = GymClass;