const Payment = require('../models/Payment');

// All Get Method

exports.GetAllPayment = async (req, res) => {
    try {
        const PaymentList = await Payment.find().populate('bookingId');
        res.status(200).json({
            status: 'Succssfulley get payment',
            message: 'Payments fetched successfully',
            total: PaymentList.length,
            Data: PaymentList
        });

    } catch (error) {
        res.status(500).json({status: 'Failed', error: error.message});
        
    }

}; 



// Get Sigle Method


exports.Getsiglepayment = async (req, res) => {
    try {
        const GetSiglepayment =  await Payment.findById(req.params.id);
        if (!GetSiglepayment) {
            return res.status(404).json({status: 'Failed', message:'Payment not found'});
            
        }

        res.status(200).json({
            status: ' Successs', 
            message: 'Payment retrieved successfully',
            data: GetSiglepayment
        });
    } catch (error) {

        res.status(500).json({status: 'Failed', error: error.message});
        
    }

};


// Update Method


exports.UpdatePayment = async (req, res) => {
    try {
        const { amount, paymentStatus, paymentMethod } = req.body;
        const UpdatePayment = await Payment.findById(req.params.id);
        if (!UpdatePayment) {
           return res.status(404).json({status: 'Failed', message: 'Payment not found'});
        
        }

        if (amount) {
            UpdatePayment.amount = amount;
        }

        if (paymentStatus) {
            UpdatePayment.paymentStatus = paymentStatus; 
        }

        if (paymentMethod) {
            UpdatePayment.paymentMethod = paymentMethod; 
        }

        const UpdatePaymentDetails =  await UpdatePayment.save();

        res.status(200).json({status: 'Success', message: 'Payment details updated successfully', Data: UpdatePaymentDetails});

    } catch (error) {
        res.status(500).json({status: 'Failed', error: error.message});
        
    }
    
}; 




// Sigle User Delete 

exports.DeleteSiglePayment = async (req, res) => {
    try {
        const DeletePayment = await Payment.findByIdAndDelete(req.params.id);
        if (!DeletePayment) {
            return res.status(404).json({status: 'Failed', message: 'Payment not found'});
        }

        res.status(200).json({status: 'Success', message: 'Successfulley Delete Payemnt', Data: DeletePayment});

    } catch (error) {
        res.status(500).json({status: 'Failed', error: error.message});
        
    }  
};


//Delete All  Payment 


exports.DeleteAllPayment = async (req, res) => {
    try {
        const DeleteAllPayment = await Payment.deleteMany({});
        res.status(200).json({status: 'Success', message: 'All payments deleted successfully', count: DeleteAllPayment});
        
    } catch (error) {
        res.status(500).json({status: 'Failed', error: error.message});
        
    }

};