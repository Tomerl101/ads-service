import { Document } from 'mongoose';

interface Location {
  type: String;
  coordinates: Number[];
}

export default interface Ad extends Document {
  id: string;
  description: string;
  imageUrl: string;
  location: Location;
  radius: number;
  operatingSystems: string[];
  browsers: string[];
  tags: string[];
}
