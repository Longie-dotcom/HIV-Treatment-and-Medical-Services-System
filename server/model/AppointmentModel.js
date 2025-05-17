const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    scheduledBy: {
        type: Schema.Types.ObjectId,
        ref: 'Scheduler'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled']
    },
    timeSlot: String,
    location: String,
    appointmentType: { 
        type: String, 
        enum: ['online', 'in_person'], 
        default: 'online' 
    },
    notes: String
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
