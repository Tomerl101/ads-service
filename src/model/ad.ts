import mongoose, { Schema } from 'mongoose';
import IAds from '../interfaces/ads.interface';

const GeoSchema: Schema = new Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
});

const AdSchema: Schema = new Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: GeoSchema, required: true },
  radius: { type: Number, required: true },
  operatingSystems: { type: [String], required: true },
  browsers: { type: [String], required: true },
  tags: { type: [String], required: true },
});

export default mongoose.model<IAds>('Ad', AdSchema);
