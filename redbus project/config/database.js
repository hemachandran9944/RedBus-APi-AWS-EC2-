const mongoose = require('mongoose');

const Cluster_DataBase = async () => {
    try {
        const cluster_databaseing = process.env.MONGO_URI || "mongodb://hemachandranhema8754_db_user:F09oZcrRvHjg9hvj@ac-cduwql2-shard-00-00.62bc372.mongodb.net:27017,ac-cduwql2-shard-00-01.62bc372.mongodb.net:27017,ac-cduwql2-shard-00-02.62bc372.mongodb.net:27017/RedBus?ssl=true&replicaSet=atlas-fmbi4s-shard-0&authSource=admin&retryWrites=true&w=majority";

        await mongoose.connect(cluster_databaseing);
        console.log("Cluster DataBase Connected Successfully ");

    } catch (error) {
        console.log("DataBase Connection Failed ", error.message);
        process.exit(1); // stop server if DB fails
    }
};

module.exports = Cluster_DataBase;