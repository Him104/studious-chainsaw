const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,

  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlegnth: [6, "Password must be at least 6 characters long"],
  },

  age : {
    type: Number,
    required: true,
  },

  city: {
    type: String,
    
  },

  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
},

{
  timestamps: true,
}

);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
