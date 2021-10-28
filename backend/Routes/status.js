import express from 'express';
import {
  listStatus,
  statusID,
  statusDetail,
  removeStatus,
  createStatus,
  updateStatus,
  profilePosts
} from '../Controllers/statusControllers';
import {
  authToken
} from '../Middleware/authenToken'
const router = express.Router();

router.get('/post/profile', authToken, profilePosts);
router.get('/post', authToken, listStatus);
router.get('/post/detail/:postID', authToken, statusDetail);
router.post('/post/create', authToken, createStatus);
router.put('/post/update/:postID', authToken, updateStatus);
router.delete('/post/remove/:postID', authToken, removeStatus);

router.param('postID', statusID);

module.exports = router;
