import Comments from '../Model/commentModel';

export const addComment = (req, res) => {
  let comment = new Comments(req.body);
  comment.save((err, comment) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Create comment failure"
      })
    }
    res.json({
      comment
    })
  })
}

export const commentID = (req, res, next, id) => {
  Comments.findById(id).exec((err, comment) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Comment does not exist"
      })
    }
    req.comment = comment;
    next();
  })
}

export const updateComment = (req, res) => {
  let comment = req.comment;
  comment = Object.assign(comment, req.body);
  comment.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Comment update failed"
      })
    }
    res.json({
      comment,
      message: "Comment updated successfully"
    })
  })
}

export const listComment = (req, res) => {
  let post = req.query.post ? req.query.post : ''
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(post)
  Comments.find({
    "status": id
  }).populate('user ', 'name avatar').exec((err, comment) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Comment does not exist"
      })

    }
    res.json({
      comment
    })
  })
}

export const removeComment = (req, res) => {
  let comment = req.comment;
  comment.delete((err, comment) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Comment delete failure"
      })
    }
    res.json({
      comment,
      message: "Comment deleted successfully"
    })
  })
}
