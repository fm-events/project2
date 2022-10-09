const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: String,
    description: String,
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    location: String,
    date: Date,
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema);
