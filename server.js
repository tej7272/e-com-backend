const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/db');
const { errorHandler } = require('./middlewares/errorHandler')
const cors = require('cors');

dbConnect();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({Name: "tej", job: "software developer"});
})

app.use("/api/v1/admin", require('./routes/formConfig'))
app.use("/api/v1/admin/configuration", require('./routes/configuration'))
app.use("/api/v1/admin", require('./routes/product'))


app.use((req, res, next) => {
    const err = new Error('404 route not found');
    res.statusCode = 404;
    next(err);
})

app.use(errorHandler);

app.listen(port, () => {
    console.log("app is running")
})