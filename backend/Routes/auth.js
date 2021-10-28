import express from 'express';
import {
  registerControllers,
  activeEmail,
  signin,
  signout,
  checkActiveEmail
} from '../Controllers/auth';

const router = express.Router();

// đăng ký
router.post('/signup', registerControllers);
// xác thực email
router.get('/active-email', activeEmail);
// đăng nhập. check active
router.post('/signin', checkActiveEmail, signin);
//đăng xuất 
router.get('/signout', signout);

module.exports = router;
