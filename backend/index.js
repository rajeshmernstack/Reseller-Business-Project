const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
const app = express();
const dotenv = require('dotenv');

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();


app.use("/api/user/", userRouter);
app.use("/api/admin/", adminRouter);


app.get("/", (req, res) => {
    console.log(req.headers.authorization)
    res.json({success: true})
});






app.listen(8000, () => {
    console.log("Server Stated on 8000 PORT")
});