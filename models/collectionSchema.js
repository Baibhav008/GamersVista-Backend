const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
    {
        userID : {type:String},
        gameTitle :{type:String},
        gameImage : {type:String} 
    }
    ,
    {
        collection:"GCol"
    } 
)

module.exports = mongoose.model("collectionSchema",collectionSchema);  