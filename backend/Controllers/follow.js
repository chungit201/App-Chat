import _ from 'lodash';
import {
  __assign
} from 'tslib';
import Follow from '../Model/follow';

export const addFollow = (req, res) => {
  let follow = new Follow(req.body);
  follow.save((err, follow) => {
    if (err) {
      console.log(err);
    }
    res.json({ follow })
  })
}

export const listFollows = (req, res) => {
  Follow.find((err, follow) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json(follow);
  }).populate('user', ('name _id'));
}

export const followID = (req, res, next, id) => {
  Follow.findById(id).populate('userFollow', 'name _id')
    .exec((err, follow) => {
      if (err) {
        return res.status(400).json({
          err,
          error: "follow not found",
        });
      }
      req.follow = follow;
      next();
    });
};

export const followDetail = (req, res) => {
  return res.json(req.follow)
}

export const findFollowToUser = (req, res) => {
  let follow = req.query.follow ? req.query.follow : "";
  const ObjectId = require("mongodb").ObjectId;
  const id = new ObjectId(follow);
  Follow.findOne({
    user: id,
  }).populate('userFollow', 'name _id')
    .exec((err, follow) => {
      if (err) {
        return res.status(400).json({
          err,
          error: "Follow does not exist",
        });
      }
      res.json({
        follow
      });
    });
};

export const updateFollowByUser = (req, res) => {
  let follow = req.follow;
  Follow.updateOne({
    _id: follow
  }, {
    $set: {
      userFollow: req.body.userFollow,
      total: req.body.total
    }
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "don't successfully"
      })
    }
  })

}
