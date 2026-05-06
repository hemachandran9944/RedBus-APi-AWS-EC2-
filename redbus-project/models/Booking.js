


const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    // Passcanger Details

    bookingRefCode:({
        type: String,
        unique: true,
        required: [true, 'Booking reference code is required'],
        trim:     true
    }),
    bookingCreatedDate:({
        type: Date,
        default: Date.now
    }),
    passengerFullName:({
        type: String,
        required: [true, 'Passenger name is required'],
        trim:     true
    }),
    passengerAge: ({
        type: Number,
        required: [true, 'Passenger age is required']
    }),
    passengerGender: ({
        type: String,
        enum: {
            values:  ['Male', 'Female', 'Other'],
            message: '{VALUE} is not a valid gender'
        },
    }),
    passengerContactNumber:({
        type:  String,
        trim:  true 
    }),
    passengerEmailAddress:({
        type: String,
        trim:  true
    }),

        // Passanger Booking Ticket

    allocatedSeatNumber: ({
       type: String,
       enum:{
        values:  ['ME2', 'L4', 'VE5'],
        message: '{VALUE} is not a valid seat number'
       },

       trim: true
    }),
    seatClassType:({
        type: String,
        enum: {
            values:  ['Economy', 'Business', 'First Class'],
            message: '{VALUE} is not a valid seat class'
        },

    }),
    ticketCurrentStatus:({
        type: String,
            enum: {
            values:  ['Confirmed', 'Cancelled', 'Pending', 'Boarded'],
            message: '{VALUE} is not a valid ticket status'
        },
        default: 'Pending'
    }),
    ticketIsssuedDate: ({
        type: Date,
        default: Date.now
    }),
    cancellationReason:({
        type: String,
        trim: true
       
    }),

    








}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);
