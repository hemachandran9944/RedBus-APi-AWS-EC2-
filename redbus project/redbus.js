
    require('dotenv').config(); 
    const bcrypt = require('bcryptjs');
    const express = require('express');
    const Cluster_DataBase = require('./config/database'); 
    


    // Controlleres

    const userRoutes    = require('./routes/userRoutes');
    const busRoutes     = require('./routes/busRoutes');
    const bookingRoutes = require('./routes/bookingRoutes');
    const PaymetRouter  = require('./routes/paymentRoutes');
    const routeRoutes   = require('./routes/routeRoutes');

    console.log('Deploy AWS EC2. Probles is over Now you login');
                        

    const app = express();
    app.use(express.json());


    app.use((req, res, next) => {
        console.log(`${req.method} request to: ${req.url}`);
        next();
    });


        // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/bus', busRoutes);
    app.use('/api/booking', bookingRoutes);
    app.use('/api/payment', PaymetRouter);
    app.use('/api/route', routeRoutes);




    app.use((req, res, next)=>{ 
        res.status(404).json({ status: "Failed", message: "Page not found, please check URL" });
    });



    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
    });