const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/db');
const { errorHandler } = require('./middlewares/errorHandler')
const cors = require('cors');

dbConnect();
const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
    origin: [
        'http://localhost:3000',              
        'https://b-nexora.vercel.app',
        'http://192.168.1.15:3000'
    ],
    methods:          ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders:   ['Content-Type', 'Authorization'],
    credentials:      true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({Name: "tej", job: "software developer"});
})

app.use("/api/v1", require('./routes/index'))


app.use((req, res, next) => {
    const err = new Error('404 route not found');
    res.statusCode = 404;
    next(err);
})

app.use(errorHandler);

app.listen(port, () => {
    console.log("app is running")
})