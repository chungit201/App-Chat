import Like from '../Model/likeModel';
import _ from 'lodash';
import {
  __assign
} from 'tslib';

export const showLikeByID = (req, res) => {
  return res.json(req.like);
}



export const likeID = (req, res, next, id) => {
  Like.findById(id)
    .exec((err, like) => {
      if (err || !like) {
        res.status(400).json({
          error: "like not found"
        })
      }
      req.like = like;

      next();
    })
}

export const createLike = (req, res) => {
  let like = new Like(req.body);
  like.save((err, like) => {
    if (err) {
      return res.status(400).json({
        err
      })
    }
    res.json({
      like
    })
  })
}

export const findLike = (req, res) => {
  let like = req.query.like ? req.query.like : '';
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(like)
  Like.findOne({
    "status": id
  }).exec((err, like) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "like does not exist"
      })
    }
    res.json({
      like
    })
  })
}

export const updateLike = (req, res) => {
  let like = req.like;
  like = __assign(like, req.body)
  like.save((err, like) => {
    if (err) {
      return res.status(400).json({
        err
      })
    }
    res.json({
      like
    })
  })
}

export const updateLikeByUser = (req, res) => {
  let like = req.like;
  Like.updateOne({
    _id: like
  }, {
    $set: {
      user: req.body.user,
      amount: req.body.amount
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
