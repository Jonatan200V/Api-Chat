const { Router } = require('express');
const {
  login,
  register,
  setAvatar,
  getAllUsers,
} = require('../controllers/users.controllers');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.get('/allusers/:id', getAllUsers);
module.exports = router;
