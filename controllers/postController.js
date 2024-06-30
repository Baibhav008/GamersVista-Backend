const asyncHandler = require("express-async-handler");
const postModel = require('../models/postModel')

const addPost = asyncHandler(async(req,res)=>
{
    try 
    {
        const {userName,userImg,userID , postID ,postImg,postCaption,likeCount,postTime } = req.body;
        const post = new postModel({userName,userImg,userID , postID ,postImg,postCaption,likeCount,postTime });
        await post.save();
        res.status(200).json({ message: 'Post created successfully'})
        
    } 
    catch (error) {
        console.error('Error in creating Post :', error);
        res.status(500).json({ message: 'Error in creating Post' });
    }

})
 
const deletePost = asyncHandler(async(req,res)=>{
    try {
        const{postID} = req.body.id;
    await postModel.findOneAndDelete({postID});
    res.status(200).json({message : "Post deleted Successfully"})
    } catch (error) {
        console.error('Error fetching collections:', error);
        
        res.status(500).json({ message: 'Error fetching collections' });
    }
})

const removePost = async(req,res)=>{

    try {
        const game = await postModel.findByIdAndDelete(req.body.id);
        if (!game) {
          res.json({message : "Post not found"});
        } else {
            res.json({message : "Post deleted"});
        }
      } catch (error) {
        console.error('Unable to delete post:', error);
        res.status(500).send('Internal server error');
      }

};

const getPosts = async (req, res) => {
    try 
    {
        const foundPosts = await postModel.find({ });
        if (foundPosts.length > 0) 
        {
           // console.log('Collections found:', foundCollections);
            res.status(200).json({ collections: foundPosts });
        } 
        else 
        {
            //console.log('No collections found for userID:', targetUserID);
            res.status(404).json({ message: 'No collections found for the specified userID' });
        }
    } catch (error) 
    {
        console.error('Error fetching collections:', error);
        
        res.status(500).json({ message: 'Error fetching collections' });
    } 
};

const likePost = async (req, res) => {
    const postID = req.body.postID;
    const uID = req.body.userID;

    try {
        // Find the post with the given postID
        const post = await postModel.findOne({ _id: postID });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if uID is already in the likesCount array
        const isLiked = post.likeCount.includes(uID);

        if (isLiked) {
            // Remove uID from likesCount
            await postModel.findOneAndUpdate(
                { _id: postID },
                { $pull: { likeCount: uID } }
            );
        } else {
            // Add uID to likesCount
            await postModel.findOneAndUpdate(
                { _id: postID },
                { $push: { likeCount: uID } }
            );
        }

        const updatedPost = await postModel.findOne({ _id: postID });
        return res.status(200).json({ updatedPost });
    } catch (error) {
        console.error('Error updating like:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports={addPost,deletePost,getPosts,likePost,removePost} 