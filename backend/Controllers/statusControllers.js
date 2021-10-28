import Status from '../Model/statusModel';

// liệt kê tất cả bài viết 
export const listStatus = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? +req.query.limit : 100;

  Status.find({}).limit(limit).sort({
    '_id': -1
  }).populate('user like comment', 'name amount user content avatar').exec((err, status) => {
    if (err) {
      return res.status(400).json({
        error: "product does not exit"
      })
    }
    res.json({
      status
    });
  })
}

// Lấy id của bài post
export const statusID = (req, res, next, id) => {
  Status.findById(id).populate('user like comment', 'name amount user content avatar')
    .exec((err, status) => {
      if (err || !status) {
        res.status(400).json({
          error: "status not found"
        })
      }
      req.status = status;
      next();
    })
}

// trả về bài post theo id
export const statusDetail = (req, res) => {
  return res.json(req.status);
}

// xóa bài post
export const removeStatus = (req, res) => {
  let status = req.status;
  status.remove((err, status) => {
    if (err) {
      return res.status(400).json({
        error: "delete status failure"
      })
    }
    res.json({
      status,
      message: "delete status successfully"
    })
  })
}

// tạo bài post
export const createStatus = (req, res) => {
  const status = new Status(req.body);
  status.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({
      data,
      message: "create status successfully"
    });
  });
}

// cập nhật bài post
export const updateStatus = (req, res) => {
  let status = req.status;
  status = Object.assign(status, req.body);
  status.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "update status failure"
      })
    }
    res.json({
      data
    })
  })
}

export const profilePosts = (req, res) => {
  let posts = req.query.post ? req.query.post : '';
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(posts)
  Status.findOne({
    "user": id
  }).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Post does not exist"
      })
    }
    res.json({
      posts
    })
  })
}
