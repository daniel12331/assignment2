import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AddReviewSchema = new Schema({
  movieid: {type: Number, required: true },
  author: { type: String, required: true},
  review: {type: String, required: true },
  rating: {type: Number, required: true},
  created_at: {type: String, required: true },
  updated_at: {type: String, required: true}
});


export default mongoose.model('AddReview', AddReviewSchema);