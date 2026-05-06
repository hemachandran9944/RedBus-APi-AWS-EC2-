


    const Booking = require ('../models/Booking');
    const Route = require('../models/Route');
    const Payment = require('../models/Payment');    
    const {BookingEmailMsg} = require ('../settings/OtpSender');
    const { default: mongoose, mongo } = require('mongoose');



    // Booking API

    exports.CreactBooking =   async (req, res) => {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();
        
            const refCode = 'MUGI BUS SERVICES-' + Math.random().toString(36).substring(2, 8).toUpperCase();
            const [newRoute] = await Route.create([req.body], { session });

            const bookingData= {...req.body, bookingRefCode: refCode,   routeId: newRoute._id };

            const [newBooking] = await Booking.create([bookingData], { session });

            const transactionID = 'TNID-'+ Date.now() + Math.floor(Math.random() * 1000);
            const [paymentData]  = await Payment.create([{
                
                bookingId            :  newBooking._id,
                transactionRefNumber :  transactionID,
                amount               :  req.body.amount,
                paymentMethod        :  req.body.paymentMethod,
                paymentStatus        :  'Paid'
    
            }], {session});

            await session.commitTransaction();
            session.endSession();

            const emailDataMsg = {
                ...newBooking.toObject(),
                amount: req.body.amount,
                paymentMethod: req.body.paymentMethod,
                paymentStatus: 'Paid'
            };

            await BookingEmailMsg(emailDataMsg);

        
            res.status(201).json({
                status: 'Success',
                messgage : 'Booking Successful ',
                data: {
                    booking: newBooking,
                    payment: paymentData,
                }
                
            
            });

        } catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();   
            }

        
            console.log('Booking Error',error);
            res.status(500).json({
                status: false,
                message: 'Booking failed, all changes reverted.',
                error: error.message
            });

            
        }finally{
            if (session) {
                session.endSession();    
            }
            
        }

    };

