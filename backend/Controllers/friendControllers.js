import Friend from "../Model/friendModel";
import _ from "lodash";
export const listFriend = (req, res) => {
  Friend.find((err, friends) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json(friends);
  });
};

export const addFriend = (req, res) => {
  const friend = new Friend(req.body);
  friend.save((err, friend) => {
    if (err) {
      return res.status(400).json({
        err,
        message: "failed to send friend request",
      });
    }
    res.json({
      friend,
      message: "Friend request sent successfully",
    });
  });
};

export const friendID = (req, res, next, id) => {
  Friend.findById(id).exec((err, friend) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "friend not found",
      });
    }
    req.friend = friend;
    next();
  });
};

export const removeFriend = (req, res) => {
  let comment = req.friend;
  comment.remove((err, friend) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "friend unfollow failure",
      });
    }
    res.json({
      friend,
      message: "friend unfollow successfully",
    });
  });
};

export const updateFriend = (req, res) => {
  let friend = req.friend;
  friend = _.assign(friend, req.body);
  friend.save((err,friend) => {
    if (err || !friend) {
      return res.status(400).json({
        err,
        message: "Update friend failure",
      });
    }
    res.json({
      friend,
      message: "update friend successfully",
    });
  });
};

export const findFriendToUser = (req, res) => {
  let friend = req.query.friend ? req.query.friend : "";
  const ObjectId = require("mongodb").ObjectId;
  const id = new ObjectId(friend);
  Friend.findOne({
    user: id,
  }).exec((err, friend) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Friend does not exist",
      });
    }
    res.json({
      friend,
    });
  });
};

export const updateClearfriend = (req, res) => {
  let follow = req.friend;
  // console.log(follow);
  Friend.updateOne(
    {
      _id: follow,
    },
    {
      $set: {
        friends: req.body.friends,
      },
    }
  ).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "don't successfully",
      });
    }
  });
};
