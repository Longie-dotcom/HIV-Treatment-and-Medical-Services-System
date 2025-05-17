const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  // Patient personal information
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  diagnosisStatus: {
    type: String,
    enum: ['not_tested', 'negative', 'positive', 'advanced'],
    default: 'not_tested'
  },
  diagnosticTests: [{
    testName: String,
    result: String,
    date: Date
  }],

  // Self-reported info (new section)
  pregnancyStatus: {
    type: String,
    enum: ['not_pregnant', 'pregnant', 'unknown'],
    default: 'unknown',
    required: true 
  },
  sexualBehavior: {
    type: String,
    enum: ['use_protection', 'no_protection'],
    default: 'use_protection',
    required: true 
  },

  // Posting for sharing experience with other user
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'BlogPost' }]
});


const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;