


const nodemailer = require('nodemailer');

    // OTP Generate 

const  isTransport  = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
        
    }
}); 



isTransport.verify((error, success) =>{
    if (error) {
        console.log("Email Connection Error:", error);
        
    } else {
        console.log("Email Server is ready to send messages!",success);
        
    }
});

            //BookingEmailMsg

const BookingEmailMsg = async (bookingData) => {
    const {
        bookingRefCode,
        passengerFullName,
        passengerEmailAddress,
        allocatedSeatNumber,
        seatClassType,
        journeyDeparturePoint,
        journeyArrivalPoint,
        journeyDepartureDate,
        journeyArrivalDate,
        amount,
        paymentMethod,
        paymentStatus
    } = bookingData;

    const departureTime = new Date(journeyDepartureDate).toLocaleString('en-IN', {
        timeStyle: 'short',
        dateStyle: 'long'
    });

    const arrivalTime = new Date(journeyArrivalDate).toLocaleString('en-IN', {
        timeStyle: 'short',
        dateStyle: 'long'
    });


    const BookingMsg = {
        from: `Mugi Bus Services <${process.env.EMAIL}>`,
        to:   passengerEmailAddress,
        subject: `Booking Confirmed ✔ | ${bookingRefCode} | Mugi Bus Services`,

        text: `
================================================================
             MUGI BUS SERVICES — BOOKING CONFIRMATION
================================================================

Dear ${passengerFullName},

We are pleased to inform you that your bus ticket has been 
successfully booked. Please find your trip details below.

----------------------------------------------------------------
                        BOOKING DETAILS
----------------------------------------------------------------

  Booking Reference   :  ${bookingRefCode}
  Booking Status      :  CONFIRMED ✔

----------------------------------------------------------------
                         TRIP DETAILS
----------------------------------------------------------------

  From                :${journeyDeparturePoint}
  To                  :${journeyArrivalPoint}
  Departure           :${departureTime}
  Arrival             :${arrivalTime}
  Seat Number         :${allocatedSeatNumber}
  Seat Class          :${seatClassType}

----------------------------------------------------------------
                       PAYMENT DETAILS
----------------------------------------------------------------

  Total Fare          :₹${amount}
  Payment Method      :${paymentMethod}
  Payment Status      :${paymentStatus}

================================================================
                        IMPORTANT NOTES
================================================================

  • Please arrive at the boarding point at least 15 minutes
    before the scheduled departure time.

  • Carry a valid government-issued photo ID proof during
    your journey (Aadhaar / PAN / Passport / Driving Licence).

  • Present this email or your Booking Reference Number
    to the conductor at the time of boarding.

  • Cancellations made 24 hours before departure are 
    eligible for a full refund.

  • For any assistance, please contact our support team.

================================================================
                        CONTACT SUPPORT
================================================================

  Email    :  hemachandranhema8754@gmail.com
  Phone    :  +91 84288 01399
  Hours    :  Monday - Saturday, 9:00 AM - 6:00 PM IST

================================================================

Thank you for choosing Mugi Bus Services.
We wish you a safe, comfortable, and pleasant journey!

Warm Regards,
Team Mugi Bus Services
© 2026 Mugi Bus Services. All rights reserved.

================================================================
        `
    };

    return await isTransport.sendMail(BookingMsg);
};








      //SendRegisterOTP  

const SendRegisterOTP = async (name, email, otp ) => {
    const mailOptions = {
        from: `Mugi Bus Services <${process.env.EMAIL}>`,
        to: email,
        subject: "Verify Your Account - Welcome to Mugi Bus Servies",
        text: `Dear ${name},\n\n` +
               `Welcome to Mugi Bus Services! We are excited to have you on board.\n\n` +
               `To activate your account and verify your email address, please use the One-Time Password (OTP) provided below:\n\n` +
               `Verification Code: ${otp}\n\n` +
               `Note: This code is valid for the next 10 minutes only. For your account's security, please do not share this OTP with anyone.\n\n` +
               `If you did not initiate this registration, no further action is required. This email was sent to verify your address.\n\n` +
               `Happy Journey,\n` +
               `Team Mugi Bus Services`
    };
        
    return await isTransport.sendMail(mailOptions);
};




            //SendForgetPasswordOTP

const SendForgetPasswordOTP = async (name, email, otp ) => {
    const forgrt_passowrd_otp = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verify Your Account - Welcome to Mugi Bus Servies",
        text: `Dear ${name},\n\n` +
              `We received a request to reset the password for your Mugi Bus Services account.\n\n` +
              `Please use the following One-Time Password (OTP) to proceed with resetting your password:\n\n` +
              `OTP: ${otp}\n\n` +
              `This OTP is valid for the next 10 minutes. For your security, do not share this code with anyone.\n\n` +
              `If you did not request a password reset, please ignore this email or contact our support team if you have concerns.\n\n` +
              `Best regards,\n` +
              `Team Mugi Bus Services`
    };

    return await isTransport.sendMail(forgrt_passowrd_otp);
};






module.exports = {
    SendRegisterOTP,
    SendForgetPasswordOTP,
    BookingEmailMsg  
};