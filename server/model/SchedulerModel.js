const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchedulerSchema = new Schema({
    // Scheduler personal information
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },

    // Working information
    assignedPatients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],

    // Rating for further recommendation for patient
    rating: {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true
        },
        communication: {
            type: Number,
            default: 0
        },
        helpfulness: {
            type: Number,
            default: 0
        },
        speed: {
            type: Number,
            default: 0
        },
        totalFeedbacks: {
            type: Number,
            default: 0
        }
    }
});

const Scheduler = mongoose.model('Scheduler', SchedulerSchema);
module.exports = Scheduler;