const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
    {
        name :{type:String, required:true},
        email: {type:String, required:true, unique:true},
        password :{type:String, required:true},
        pic:{type:String, default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },

        about:{type:String , default:"I love gaming", required:true},
        steamAccount : {type:String, default:"https://www.steam.com",required:true},
        epicGamesAccount : {type:String, default:"https://www.epicgames.com",required:true},
        alias : [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref : "User"
            }
        ],


    }, 
    {
        timestamps : true

    }
   
);

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)

}

userSchema.pre('save', async function (next) {
    if(!this.isModified)
    {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

const User = mongoose.model("User",userSchema);
module.exports=User;