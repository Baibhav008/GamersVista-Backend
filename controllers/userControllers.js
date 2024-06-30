const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken.js");
const bcrypt = require('bcryptjs');

const registerUser = asyncHandler(async(req,res) => {

    const{name,email,password,pic} = req.body;

    if(!name||!email||!password){
        res.status(400);
        throw new Error("Please enter all fields");
    }

    const userExist = await User.findOne({email});

    if(userExist)
    {
        res.status(400);
        throw new Error("User already exist");
    }

    const user = await User.create({
        name,email,password,pic
    });

    if(user)
    {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            
            token : generateToken(user._id)  
        })
    }else{
        res.status(400);
        throw new Error("Failed");
    }
  
});
 



const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const user =await User.findOne({email});

    if(user && (await user.matchPassword(password)))
    {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            steam:user.steamAccount,
            epic:user.epicGamesAccount,
            about:user.about,
            token : generateToken(user._id) 
        })
    }else{
        res.status(400);
        throw new Error("User Not Found");
    }

});

// /api/user?search=name
//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

const searchUser = async(req,res)=>{
    const key = req.body.key;
    const usersWithEmail = await User.find({ name: { $regex: new RegExp(key, 'i') } });
    res.json(usersWithEmail);

}



const updateUser = asyncHandler(async (req, res) => {

    const { name, email, password, pic,about ,eA ,sA } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    if (existingUser) {
        // Update existing user's details
        existingUser.name = name;
        existingUser.password = password;
        existingUser.pic = pic;
        existingUser.email = email;
        existingUser.steamAccount=sA;
        existingUser.epicGamesAccount=eA;
        existingUser.about = about;

        // Save the updated user
        await existingUser.save();

        res.status(200).json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            pic: existingUser.pic,
            epicGamesAccount : existingUser.epicGamesAccount,
            steamAccount : existingUser.steamAccount,
            about : existingUser.about,
            token: generateToken(existingUser._id),
        });
    } 
    else{
        res.status(400).json({error : "update Failed"})
    }
});

const getCurrent = async(req,res)=>{
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    res.status(200).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        password:existingUser.password,
        pic: existingUser.pic,
        epicGamesAccount : existingUser.epicGamesAccount,
        steamAccount : existingUser.steamAccount,
        about : existingUser.about,
        token: generateToken(existingUser._id),
    });


}




module.exports={registerUser,authUser,allUsers,updateUser,getCurrent,searchUser}; 



