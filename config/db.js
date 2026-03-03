const mongoose = require('mongoose');

console.log(process.env.MONGO_URL)

const dbConnect = async () => {
    try {
        const db = mongoose.connection;
        db.on("connected", () => console.log("MongoDB connected successfully"));
        db.on("error", (err) => console.error("MongoDB error:", err));
        db.on("disconnected", () => console.log("MongoDB disconnected"));

        await mongoose.connect(process.env.MONGO_URL);
    } catch(err) {
        console.error(`Database connection failed due to Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = dbConnect;