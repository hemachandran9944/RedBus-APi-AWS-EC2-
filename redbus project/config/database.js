






const mongoose = require('mongoose');

//Cluster DataBase


const cluster_databaseing = process.env.MONGO_URI || "mongodb://hemachandranhema8754_db_user:F09oZcrRvHjg9hvj@ac-cduwql2-shard-00-00.62bc372.mongodb.net:27017,ac-cduwql2-shard-00-01.62bc372.mongodb.net:27017,ac-cduwql2-shard-00-02.62bc372.mongodb.net:27017/RedBus?ssl=true&replicaSet=atlas-fmbi4s-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(cluster_databaseing)
    .then(()=>{
        console.log("Cluster  DataBase Conneting Successfulley");
    })


    .catch((error)=>{
        console.log(error.message );
    });


