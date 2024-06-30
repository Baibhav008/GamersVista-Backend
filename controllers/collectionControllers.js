const asyncHandler = require("express-async-handler");

const collectionSchema = require("../models/collectionSchema");

const addCollection = asyncHandler(async(req,res) => {

    const{userID,gameTitle,gameImage} = req.body;
  
    
        collectionSchema = await collectionSchema.create({userID,gameTitle,gameImage});
    res.status(200).json(collectionSchema);
    
});  


const removeCollection = async(req,res)=>{

    try {
        const game = await collectionSchema.findByIdAndDelete(req.body["id"]);
        if (!game) {
          res.json({message : "Game not found"});
        } else {
            res.json({message : "Game deleted"});
        }
      } catch (error) {
        console.error('Unable to delete game:', error);
        res.status(500).send('Internal server error');
      }

};

const createDetail = async (req, res) => {
    try {
        const { userID, gameTitle, gameImage } = req.body;
        const collection = new collectionSchema({
            userID, gameTitle, gameImage
        });
        await collection.save();

   
        res.status(201).json({ message: 'Detail created successfully'});
    } catch (error) {
        
        console.error('Error creating detail:', error);
        res.status(500).json({ message: 'Error creating detail' });
    }
};

const getList = async (req, res) => {
    try {
        const targetUserID = req.body["id"];
        const foundCollections = await collectionSchema.aggregate([
            {
                $match: { userID: targetUserID }
            }
        ]);

        if (foundCollections.length > 0) {
            res.status(200).json({ collections: foundCollections });
        } else {
            console.log('No collections found for userID:', targetUserID);
            res.status(404).json({ message: 'No collections found for the specified userID' });
        }
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ message: 'Error fetching collections' });
    }
};

module.exports={addCollection,createDetail,getList,removeCollection};

