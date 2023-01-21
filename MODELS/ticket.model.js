const mongoose = require("mongoose");
const constants = require("../UTILS/constants");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ticketPriority: {
      type: Number,
      default: 4,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: constants.ticketStatus.open,
    },
    reporter: {
      type: String,
    },
    assignee: {
      type: String,
    },

    creationDate: {
      type:String,
      default: new Date().toLocaleDateString(),
    },
    creationTime: {
      type: String,
      default: new Date().toLocaleTimeString(),
    },

    updationDate: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
    updationTime: {
      type: String,
      default: new Date().toLocaleTimeString(),
    },
  },
  { timestamps: false }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket };
