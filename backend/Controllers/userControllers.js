import User from '../Model/userModel';
import _ from 'lodash';
// lấy id của profile
export const getusers = async (req,res)=>{
      //pagination
      let { _page,_limit }= req.query;
      _limit = Number(_limit)
      const countDocuments = await User.countDocuments({});
      console.log(countDocuments);
      if(_page && _limit){
          let currentPage = Number(_page);
          if(currentPage < 1){
              currentPage = 1;
          }
          var skipDocuments = (currentPage - 1) * _limit;
          User.find({})
          .skip(skipDocuments)
          .limit(_limit)
          .then(docs=>{
              res.status(200).json({
                  data : docs, totalPage : Math.ceil(countDocuments / _limit)
              })
          })
          .catch(err=>{
              console.log(err.message);
              res.status(400).json({
                  message : ['ERROR_SERVER']
              })
          })
      }else{
        User.find({}).populate('follower', 'name _id')
          .then(data=>{
              res.json(data);
          })
          .catch(err=>{
              res.status(400).json('loi sever')
          })
      }
 
}

export const userID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found"
      })
    }
    req.profile = user;
    next();
  })
}

// hiển thị chi tiết profile
export const userDetail = (req, res) => {
  return res.json(req.profile);
}

// cập nhật profile
export const updateUser = (req, res) => {
  User.findOneAndUpdate({
    _id: req.profile._id
  }, {
    $set: req.body
  }, {
    new: true
  }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'You are not authorized to perform in action'
      })
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user)
  })
}

export const updateDetailProfile = (req, res) => {
  let profile = req.profile;
  profile = Object.assign(profile, req.body);
  profile.save((err, profile) => {
    if (err) {
      return res.status(400).json({
        error: 'Update profile failure!'
      })
    }
    res.json({
      profile,
      message: 'Update profile successfully'
    })
  })
}

export const searchUser = (req, res) => {
  let search = req.query.search ? req.query.search : '';
  User.find({
    "name": {
      $regex: search,
      $options: '$i'
    }
  }).exec((err, user) => {
    if (err) {
      res.status(400).json({
        error: "User not found"
      })
    }
    res.json({
      user
    })
  })
}

export const uniqueEmail = (req, res) => {
  let email = req.query.email ? req.query.email : '';
  User.find({
    "email": new RegExp(email, 'i')
  }).exec((err, user) => {
    if (err) {
      return res.status(401).json({
        err
      })
    }
    res.json({
      user
    })
  })
}
