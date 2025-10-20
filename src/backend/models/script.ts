import { Schema, model } from 'mongoose';

const scriptSchema = new Schema({
    studentId: {
        type: String,
        required: true,
    },
    tutorId: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    markedAt: {
        type: Date,
    },
    grade: {
        type: String,
    },
    feedback: {
        type: String,
    },
});

const Script = model('Script', scriptSchema);

export default Script;