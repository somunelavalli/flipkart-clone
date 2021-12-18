const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, min: 3, max: 30 },
    lastName: { type: String, required: true, trim: true, min: 3, max: 30 },
    userName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    userPassword: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

// userSchema.virtual("password").set(function (password) {
//   this.userPassword = bcrypt.hashSync(password, 10);
// });

// userSchema.methods = {
//   authenticate: function (password) {
//     return bcrypt.compareSync(password, this.userPassword);
//   },
// };

module.exports = mongoose.model("User", userSchema);
