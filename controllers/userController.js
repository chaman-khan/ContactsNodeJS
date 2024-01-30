
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register the USer
//@route GET /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email});
    const usernameAvailable = await User.findOne({username});
    if(userAvailable) {
        res.status(400);
        throw new Error("User with this email already registered");
    };
    if(usernameAvailable) {
        res.status(400);
        throw new Error("User with this username already registered");
    };

    // hash password
    const hashedpassword =await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedpassword,
    });
    console.log(`User Created, ${user}`);

    if(user) {
        res.status(201).json({_id: user.id, email: user.email});
    }
    else {
        res.status(400);
        throw new Error("User data not valid");
    }

    console.log("HashedPassword" , hashedpassword);
    res.json({message: "Register the User !"})
});

//@desc Login the USer
//@route GET /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    };
    const user = await User.findOne({email});

    //comparing passwords
    if(user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "5m"}
        )
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid! ")
    }
    res.json({message: "Login the User !"})
});

//@desc Current User Information
//@route GET /api/users/current
//@access public

const currentUser = asyncHandler(async (req, res) => {
    res.json({message: "Current USer information"})
});

module.exports = {registerUser, loginUser, currentUser}