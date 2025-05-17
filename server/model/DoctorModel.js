const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    // Personal information
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    specialties: {
        type: [String], 
        required: true
    },
    qualifications: {
        type: [String], 
        required: true
    },
    yearsOfExperience: {
        type: Number, 
        required: true
    },
    languagesSpoken: {
        type: [String], 
        required: true
    },
    bio: {
        type: String, 
        required: true
    },
    hospitalAffiliation: {
        type: String, 
        required: true
    },
    profileVisibility: { 
        type: Boolean, 
        default: true 
    },

    // Working information
    assignedPatients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],

    // Sharing education information for people, promote HIV knowledge
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogPost'
    }],

    // Rating for further recommendation system for patient
    rating: {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true
        },
        empathy: {
            type: Number,
            default: 0
        },
        clarity: {
            type: Number,
            default: 0
        },
        comfortLevel: {
            type: Number,
            default: 0
        },
        totalFeedbacks: {
            type: Number,
            default: 0
        }
    }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;