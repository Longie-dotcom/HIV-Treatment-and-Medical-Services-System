const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ARVRegimenTemplateSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  }, // Tên phác đồ: "TDF + 3TC + DTG"
  medications: [{
    name: String,
    dosage: String,
    frequency: String
  }],
  applicableFor: [{
    type: String,
    enum: ['Adult', 'Pregnant Women', 'Children', 'Teenager', 'Other']
  }],
  description: String
});

const ARVRegimenTemplate = mongoose.model('ARVRegimenTemplate', ARVRegimenTemplateSchema);
module.exports = ARVRegimenTemplate;
