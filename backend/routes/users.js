const router = require('express').Router();
const { celebrate } = require('celebrate');
const userSchema = require('../schemas/userShema');
const {
  getUser, getUsers, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/:userId', celebrate(userSchema.id), getUser);
router.get('/', getUsers);
router.patch('/me', celebrate(userSchema.profile), updateUser);
router.patch('/me/avatar', celebrate(userSchema.avatar), updateAvatar);

module.exports = router;
