
const express = require('express');
const { registerUser, authUser, allUsers, updateUser, getCurrent, searchUser } = require('../controllers/userControllers');

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post('/login',authUser);

router.route('/').post(registerUser);
router.route("/").get(protect, allUsers);
router.route("/updateUser").post(updateUser)
router.route("/getCurrent").post(getCurrent);
router.route("/search").post(searchUser);


module.exports = router;
 