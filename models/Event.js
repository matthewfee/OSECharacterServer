const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventText: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: false,
  },
  eventUser: {
    type: String,
    required: false,
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
