import express from 'express';
import {
  userID,
  userDetail,
  updateUser,
  searchUser,
  uniqueEmail,
  updateDetailProfile,
  getusers
} from '../Controllers/userControllers';
import {
  authToken
} from '../Middleware/authenToken'
const router = express.Router();

router.get('/profile/search', authToken, searchUser);
router.get('/users',authToken,getusers)
router.get('/profile/unique-email', uniqueEmail);
router.get('/profile/:userID', authToken, userDetail);
router.put('/profile/update/:userID', authToken, updateUser);
router.put('/profile/update-detail/:userID', authToken, updateDetailProfile)

router.param('userID', userID);
module.exports = router;
