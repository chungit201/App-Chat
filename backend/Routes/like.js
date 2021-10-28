import express from 'express';
import {
  showLikeByID,
  likeID,
  createLike,
  updateLike,
  findLike,
  updateLikeByUser
} from '../Controllers/likeControllers';
import {
  authToken
} from '../Middleware/authenToken'
const router = express.Router();
router.get('/like/find', authToken, findLike)
router.get('/like/:likeID', authToken, showLikeByID);
router.post('/like/create', authToken, createLike);
router.put('/like/update/:likeID', authToken, updateLike);
router.put('/like/update-like-user/:likeID', authToken, updateLikeByUser);


router.param('likeID', likeID)

module.exports = router;
