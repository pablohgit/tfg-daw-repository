const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    require: true,
    max: 50
  },
  password: {
    type: String,
    require: true,
    min: 8,
    max: 20
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false
  },
  avatarImage: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Users", userSchema);
