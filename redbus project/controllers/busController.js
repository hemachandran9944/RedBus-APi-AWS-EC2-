
    const jwt = require('jsonwebtoken');
    const Bus  = require('../models/Bus');
    const { json } = require('express');

        // Bus Creact API

    exports.CreatBus =  async (req, res) => {
        try {
            
            const newBus  = await Bus.create(req.body);
            res.status(201).json({
                status: "Success",
                message: "Bus created successfully.",
                data: newBus,
                
            });
        } catch (error) {

            if (error.code === 11000) {
                return res.status(400).json({
                    message: "Duplicate entry detected. The provided information is already registered."
                });
                
            }
            res.status(500).json({error: error.message});
            
        }
        
    };


            // Get All User Bus

exports.GetAllBus   =  async function (req, res) {
    try {
        const buses  = await Bus.find();
        res.status(200).json({
            status: "Success",
            results: buses.length,
            data: buses
        });

    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
    
};            


        // Get Single Users


exports.SigleBus = async (req, res) => {
    try {
        const sigleBus = await Bus.findById(req.params.id);
        if (!sigleBus) {
            return res.status(400).json({ message: "User Not Found"}); 
        }

        res.status(200).json({status: "Success",data: sigleBus });
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
    
}        
    



                        // Bus Update API


exports.busUpdate = async (req, res) => {
    try {
        const {busName, busType, totalSeats, busNumber, amenities} = req.body;
        const busUpdate = await Bus.findById(req.params.id);
        if (!busUpdate) {
            return res.status(400).json({message: "Bus not found"});
        }

        if (busName) {
            busUpdate.busName = busName ; 
        }

        if (busType) {
            busUpdate.busType = busType;
        }

        if (totalSeats) {
            busUpdate.totalSeats = totalSeats; 
        }

        if (busNumber) {
            busUpdate.busNumber = busNumber;
        }

        const UpdatenewBus = await busUpdate.save();

        res.status(200).json({status: "Success", data: UpdatenewBus});

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "This bus number is already in use" });
        }
        res.status(500).json({error: error.message});
        
    }
    
};     


        //DeleteSigleBus API    

exports.DeleteSigleBus = async (req, res) => {
    try {
        const deleteBus  = await Bus.findByIdAndDelete(req.params.id);
        if (!deleteBus) {
            return res.status(404).json({message: "Bus not found"});    
        }

        res.status(200).json({status: "Success", message: "Bus deleted successfully!"});

    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message});
        
    }

};


                //deleteAllBus API


exports.deleteAllBus = async (req, res) => {
    try {
        const deleteallBus  = await Bus.deleteMany({}); 
        res.status(404).json({status: "Success", message: "Delete all bus successfulley!", Count: deleteallBus.deletedCount});

    } catch (error) {
        res.status(500).json({error: error.message});
        
    }

};
