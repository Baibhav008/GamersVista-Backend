const express = require('express')

const {addPost,deletePost, getPosts, likePost, removePost} = require('../controllers/postController')

const router = express.Router();

router.post("/addPost",addPost);
router.post("/delete",removePost)
router.post("/",getPosts)
router.post("/like",likePost);

module.exports = router; 