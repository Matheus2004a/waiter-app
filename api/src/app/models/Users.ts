import { Schema, model } from 'mongoose';

export const Users = model('Users', new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}));
