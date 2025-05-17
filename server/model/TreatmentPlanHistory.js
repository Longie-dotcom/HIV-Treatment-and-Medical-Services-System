const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreatmentPlanHistorySchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },

  date: { type: Date, default: Date.now },

  // ARV treatment details
  regimenTemplate: { type: Schema.Types.ObjectId, ref: 'ARVRegimenTemplate' },
  customizedMedications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date
  }],
  artRegimenType: {
    type: String,
    enum: ['First-line', 'Second-line', 'Third-line', 'Experimental'],
    required: true
  },

  // Monitoring parameters
  cd4Count: Number,
  cd8Count: Number,
  cd4Cd8Ratio: Number,
  viralLoad: Number,
  resistanceTestResult: String,

  // Clinical tracking
  adherenceStatus: {
    type: String,
    enum: ['Good', 'Moderate', 'Poor'],
    default: 'Good'
  },
  sideEffects: [String],

  // Follow-up support
  pillReminderTime: [String],
  reExaminationTime: Date,

  notes: String,
  lastUpdated: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  reasonForChange: String
});

const TreatmentPlanHistory = mongoose.model('TreatmentPlanHistory', TreatmentPlanHistorySchema);
module.exports = TreatmentPlanHistory;
