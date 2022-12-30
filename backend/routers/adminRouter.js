const express = require('express');
const adminRouter = express.Router();

const adminController = require('../controllers/adminController');


adminRouter.post('/registeruser', adminController.registerUser);
adminRouter.get('/getallusers', adminController.getAllUsers);
adminRouter.delete('/deleteuser', adminController.removeUser);
adminRouter.post('/login', adminController.loginAdmin);
adminRouter.get('/getStatisticsForDashboard', adminController.getStatisticsForDashboard);
adminRouter.post('/getsingleuserbyid', adminController.getSingleUserById)

module.exports = adminRouter;