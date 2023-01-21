const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: { 
      type: String,
      required: true,
      unique: true,// as two persons don't have same emails
      lowercase: true,
    },
    userType: {
      type: String,
      default: "CUSTOMER",
    },
    userStatus: {
      type: String,
      default: "PENDING",
    },
    ticketsCreated: 
      [{ type: mongoose.ObjectId }],
    
    assignedTickets: [{type:mongoose.ObjectId}]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User,userSchema };
