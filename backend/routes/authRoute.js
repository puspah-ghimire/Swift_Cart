import express from 'express';
import { register, login, logout, getUserInfo, getAllUsers, updateUserPassword, updateUserRole, updateUserProfile, forgotUserPassword, resetUserPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user', getUserInfo);
router.get('/users', getAllUsers);
router.post('/update-password', updateUserPassword);
router.post('/update-userRole', updateUserRole);
router.post('/update-userProfile', updateUserProfile);
router.post('/forgot-password', forgotUserPassword);
router.post('/reset-password', resetUserPassword);

export default router;
