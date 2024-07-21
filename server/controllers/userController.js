const User = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req,res,next) =>{
    try{
        const {username,email,password} = req.body;
    const usernameCheck = await User.findOne({username})
    if(usernameCheck)
        return res.json({msg:"Username already used", status:false});
    const emailCheck = await User.findOne({email})
    if(emailCheck)
        return res.json({msg:"Email already used", status:false});

    const hashedPassword = await bcrypt.hash(password,10);

    const user= await User.create({
        email,
        username,
        password:hashedPassword

    });

    delete user.password;
    return res.json({status:true,user});


    }catch(err){
        res.status(500).json(err)
    }

}



module.exports.login = async (req,res,next) =>{
    try{
    const {username,password} = req.body;
    const users = await User.findOne({ username })
    if(!users)
        return res.json({msg:"Incorrect Username", status:false});
    const isPasswordValid = await bcrypt.compare(password,users.password)

    if(!isPasswordValid)
        return res.json({msg:"Incorrect Password", status:false});
    delete users.password;

    return res.json({status:true,users});


    }catch(err){
        res.status(500).json(err)
    }

}



module.exports.setAvatar = async (req,res,next) =>{
    try{
    const userId = req.params.id;
    const isAvatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId,{
        isAvatarImageSet:true,
        isAvatarImage,
    });

    return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.isAvatarImage,
    });


    }catch(err){
        res.status(500).json(err)
        next(err)
    }

}