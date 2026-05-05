

const mongoose  =  require('mongoose');

const BusSchema  = mongoose.Schema({

    busName: ({
        type: String,
        require: true,
        trim: true 
    }),
    busType: ({
        type: String,
        require: [true, "Bus name is required"],
        trim: true
    }),
    totalSeats: ({
        type: String,
        require: [true, "Total seats is required"],
        trim: true
    }),
    busNumber: ({
        type: String,
        require: [true, "Bus number is required"],
        unique: true,
        uppercase: true,
        trim: true
    }),
    amenities: [{
        type: String,
        require: true,
        trim: true    
    }],
    isActive:({
        type: Boolean,
        default: true
    }),

},{timestamps: true}); 


module.exports  = mongoose.model('Bus', BusSchema);