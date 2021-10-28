import express from "express";
import { addFollow, findFollowToUser, followDetail, followID, listFollows } from "../Controllers/follow";
import { authToken } from "../Middleware/authenToken";
const router = express.Router();

router.post('/follows/add', authToken, addFollow);
router.get('/follows',authToken,listFollows)
router.get('/follows/:followId',authToken,followDetail);
router.get("/follow/find-user", authToken, findFollowToUser);
router.param("followId", followID);
module.exports = router;
