const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
  {
    eventPicture: {
      type: String,
      default: "/images/fm.jpg",
    },
    title: String,
    description: String,
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    location: String,
    // maxAttendees: Number,
    date: String,
    time: String,
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Event', eventSchema);
