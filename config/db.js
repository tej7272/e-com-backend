const mongooose = require('mongoose');

const dbConnect = async () => {
    try{
        await mongooose.connect(process.env.MONGO_URL);
        const db = mongooose.connection;
        db.on("connected", () => {
            console.log("MongoDB connected successfully");
        })
    }catch(err){
        console.error(`Database connection failed due to ${err}`);
    }
}

module.exports = dbConnect;