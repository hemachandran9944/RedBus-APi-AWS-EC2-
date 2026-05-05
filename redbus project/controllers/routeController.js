const Route = require('../models/Route');


// Get Method 

exports.GetAllRoute = async (req, res) => {
    try {
        const getAllMethodRoute = await Route.find();
        res.status(200).json({
            status: "Success",
            message: "Routes  get successfully",
            total: getAllMethodRoute.length,
            Data: getAllMethodRoute,

        });
    } catch (error) {
        res.status(500).json({status: "Failed",error: error.message})
        
    }

};




// Get Sigle Method 


exports.GetSigelMethodRouters = async (req, res) => {
    try {
        const getSiglerouter = await Route.findById(req.params.id);
        if (!getSiglerouter) {
            return res.status(404).json({status: "Failed", message: "Route not found"});
        };
        res.status(200).json({status: "Success", message: "Route get successfully", data: getSiglerouter});
    } catch (error) {
        res.status(500).json({status: "Failed", error: error.message});
        
    }

};


// Update Method 


exports.UpdateRouts  = async (req, res) => {
    try {
        const {journeyDeparturePoint, journeyArrivalPoint} =  req.body;
        const RouteID = await Route.findById(req.params.id);
        if (!RouteID) {
            return res.status(404).json({status: "Failed", message: "Route not found"});
        }
        
        if (journeyDeparturePoint) {
            RouteID.journeyDeparturePoint  = journeyDeparturePoint;
        }

        if (journeyArrivalPoint) {
            RouteID.journeyArrivalPoint = journeyArrivalPoint;
        }

        const UpdateRoute = await RouteID.save();
        res.status(200).json({status: "Success", message: "Update Successfulley!",data: UpdateRoute});
    } catch (error) {

        res.status(500).json({status: "Failed", error: error.message});
        
    }

};




// Delete Sigle Route 


exports.DeleteSigleRoute   = async (req, res) => {
    try {
        const DeleteRoutes = await Route.findByIdAndDelete(req.params.id);
        if (!DeleteRoutes) {
            return res.status(404).json({status: "Failed", message: "Route not found"});
        }
        res.status(200).json({status: 'Success', message: "Sigle route delete Successfulley", Data: DeleteRoutes});
    } catch (error) {
        res.status(500).json({status: "Failed", error: error.message });
        
    }
    
};

// Delete All Route

exports.DeleteAllroutes  = async (req, res) => {
    try {
        const DeleteAllRoutes = await Route.deleteMany({});
        res.status(200).json({
            status: "Success",
            message: "All route delete successfulley!",
            Count: DeleteAllRoutes.deletedCount,
            Data: DeleteAllRoutes
        });

    } catch (error) {
        res.status(500).json({status: "Failed", error: error.message});
        
    }  
};
