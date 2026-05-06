
    require('dotenv').config(); 
    const express = require('express');
     



    // Controlleres

    const userRoutes    = require('./routes/userRoutes');
    const busRoutes     = require('./routes/busRoutes');
    const bookingRoutes = require('./routes/bookingRoutes');
    const PaymetRouter  = require('./routes/paymentRoutes');
    const routeRoutes   = require('./routes/routeRoutes');

    

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




    app.use((req, res)=>{ 
        res.status(404).json({ status: 'Failed', message: 'Page not found, please check URL' });
    });

    const  testing = "hi";

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
    });



    console.log("Deploy AWS EC2. issus is over Now can you login");
                        