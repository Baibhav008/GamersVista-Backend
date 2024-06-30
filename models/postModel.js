const mongoose = require('mongoose')
const postModel = new mongoose.Schema(
    {
        userName:{type:String},
        userImg:{type:String},
        userID : {type:String},
        postID : {type:String}, 
        postImg : {type:String},
        postCaption : {type:String},
        likeCount : [{ type: String }],
        postTime :{type:Date}
    },
    {
        collection:"POSTS"
    }
)

module.exports = mongoose.model("postModel",postModel)
 