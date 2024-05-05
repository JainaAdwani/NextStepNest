import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      default: "https://i.pinimg.com/originals/0d/42/90/0d42905fc5e9d14fa032d8ea0282bf68.jpg"
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
