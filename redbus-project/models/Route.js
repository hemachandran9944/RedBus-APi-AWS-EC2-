


const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
        

    journeyDeparturePoint: ({
        type: String,
        trim: true
    }), 
    journeyArrivalPoint:({
      type: String,
      trim: true 
    }),
    journeyDepartureDate: ({
        type: Date
    }),
    journeyArrivalDate:({
        type: Date
    }),

},{timestamps: true});

module.exports = mongoose.model('Route', RouteSchema);