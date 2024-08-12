const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'HalfDay', 'Holiday'],
        required: true
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
