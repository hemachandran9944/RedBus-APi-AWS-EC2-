const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    transactionRefNumber: {
        type: String,
        unique: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Card", "UPI", "Net Banking"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Unpaid", "Refunded", "Failed"],
        default: "Unpaid"
    },
    paidAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);