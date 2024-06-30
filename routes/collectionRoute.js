const express = require("express");

const { addCollection, createDetail, getList, removeCollection } = require("../controllers/collectionControllers");


const router = express.Router();


router.post('/add-collection',createDetail);
router.post("/",getList);
router.post("/deleteGame",removeCollection);

//router.route("/get-collection").get(protect, allUsers);

module.exports = router; 