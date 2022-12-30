const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
// const loginTheAdmin = (req, res) => {
//     User.findOne(req.body, (err, admin) => {
//         res.json(admin)
//     })
//     jwt.sign({username: username}, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });


// }


const registerUser = async (req, res) => {
    const newUser = new User(req.body)
    await newUser.save().then(() => {
        res.json({ success: true, message: "user created successfully", data: newUser });
    }).catch((err) => {
        res.json({ success: false, message: "error while creating user", error: err });
    })
}
const getAllUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            res.json({ success: false, message: "error while fetching the users", error: err });
        } else {
            res.json({ success: true, message: "users fetched successfully", data: users });
        }
    }).clone();
}


const removeUser = (req, res) => {
    User.deleteOne(req.body).then(() => {
        res.json({ success: true, message: "user deleted successfully" })
    }).catch(err => {
        res.json({ success: false, message: "error while deleting user", error: err });
    });
}


const loginAdmin = (req, res) => {
    User.findOne({ $and: [req.body] }).then((user) => {
        if (user && user.userRole === 0) {
            console.log(user)
            jwt.sign({ username: req.body.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    res.json({ success: false, message: "error while signing the token", error: err });
                } else {
                    res.json({ success: true, message: "Admin LoggedIn Successfully", token: token });
                }
            })
        } else {
            res.json({ success: false, message: "Admin not found" });
        }

    }).catch(err => {
        res.json({ success: false, message: "Error Occured" });
    });
}

const getStatisticsForDashboard = (req, res) => {
    User.aggregate([{
        $group: {
            _id: '$userRole',
            grandTotalUsers: {
                $sum: "$userRole"
            },
            grandTotalCredits: {
                $sum: "$totalCredits"
            },
            grandUsedCredits: {
                $sum: "$usedCredits"
            },
            grandRemainingCredits: {
                $sum: "$remainingCredits"
            }
        }
    }]).then((response) => {
        res.json({ success: true, message: "statistics fetched successfully", statistics: response })
    }).catch(err => {
        res.json({ success: false, message: "error while fetching the statistics", error: err });
    });
}

const getSingleUserById = (req, res) => {
    User.findById(req.body.uid).then((user) => {
        if(user) {

        res.json({success: true, message: "user fetched successfully", data: user});
        }else{
            res.json({success: false, message: "user not found"});
        }
    }).catch((err) => {
        res.json({success: false, message: "error fetching user", error: err})
    })
}

module.exports = {
    registerUser,
    getAllUsers,
    removeUser,
    loginAdmin,
    getStatisticsForDashboard,
    getSingleUserById
}
