const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController.js');


// userRouter.post("/register", userController.registerUser);
// userRouter.post("/login", );
// userRouter.get("/getSingleUser", userController.getSingleUser);


module.exports = userRouter;