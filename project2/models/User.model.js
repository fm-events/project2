const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    // username:{
    //   type: String,
    //   required: [true, 'Username is required.'],
    //   unique: true,
    //   trim: true,
    // },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    attendedEvents: [{
      type: Schema.Types.ObjectId,
      ref: "Event"
    }],
    organizedEvents: [{
      type: Schema.Types.ObjectId,
      ref: "Event"
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
