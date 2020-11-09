let mongoose = require('mongoose');
let genderValues = ["Male", "Female", "Transgender", "Other", "Prefer not to say"]


let userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      required: true
    },
    lastName: {
      type: String,
      lowercase: true,
      required: true
    },
    sex: {
      type: String,
      enum: genderValues,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { collection: 'users' });
let User = mongoose.model('User', userSchema);
module.exports = User;
