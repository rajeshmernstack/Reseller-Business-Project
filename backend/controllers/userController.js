const User = require('../models/userModel');

const loginUser = async (req, res) => {
    const {usernamae, password} = req.body;
    
}

const updateUser = async (req, res) => {
    await User.updateByIdAndUpdate(req.body )
}

const getSingleUser = async(req, res) => {
    const myUser = await User.findOne(req.body.uid).then((user) => {
        res.json({success: true, message: "user fetched successfully", data: user});
    }).catch((err) => {
        res.json({success: false, message: "error fetching user", error: err})
    })
}



const updateTotalCredits = (req, res) => {

}

const updateUsedCredits = (req, res) => {

}

const updateRemainingCredits = (req, res) => {

}


module.exports = {
    updateRemainingCredits
}