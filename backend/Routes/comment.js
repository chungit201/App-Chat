import express from 'express';
import {
  addComment,
  commentID,
  updateComment,
  listComment,
  removeComment
} from '../Controllers/commentControllers';
import {
  authToken
} from '../Middleware/authenToken'
const router = express.Router();

router.get('/comment', authToken, listComment);
// router.get('/comment/:commentID', ); bảo trì chưa hoàn thiện
router.post('/comment/create', authToken, addComment);
router.put('/comment/update/:commentID', authToken, updateComment);
router.delete('/comment/remove/:commentID', authToken, removeComment);
router.param('commentID', authToken, commentID);

module.exports = router;
