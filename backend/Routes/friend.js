import express from "express";
import {
  addFriend,
  removeFriend,
  friendID,
  updateFriend,
  listFriend,
  findFriendToUser,
  updateClearfriend,
} from "../Controllers/friendControllers.js";
import { authToken } from "../Middleware/authenToken";
const router = express.Router();

router.get("/friend/find-user", authToken, findFriendToUser);
router.post("/add-friend", authToken, addFriend);
router.put("/friend/update/:friendID", authToken, updateFriend);
router.put("/friend/clear/:friendID", authToken, updateClearfriend);
router.delete("/friend/remove/:friendID", authToken, removeFriend);
router.get("/friend", listFriend);

router.param("friendID", friendID);

module.exports = router;
