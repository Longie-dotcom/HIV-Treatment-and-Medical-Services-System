const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ROLES = require('../constant/RoleUser');

const UserSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String,
    required: true 
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true 
  },
  role: {
    type: String,
    enum: [ROLES.PATIENT, ROLES.DOCTOR, ROLES.SCHEDULER, ROLES.MANAGER, ROLES.ADMIN],
    required: true
  },
  profilePic: {
    type: String,
    default: 'guest.png'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;