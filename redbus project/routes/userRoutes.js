
const express = require('express');
const router  = express.Router();

const userController = require ('../controllers/userController')
const { authorizationTokenVerify } = require('../settings/autho'); 


router.post('/register', userController.RegisterUser);
router.post('/register-otp-verify', userController.RegisterOtpVerify);
router.post('/login',userController.LoginUesr);


router.get('/UserProfile/:id',authorizationTokenVerify ,userController.SigleUser);
router.get('/allUser', userController.GetAllUsers);

router.put('/update-profile/:id',authorizationTokenVerify ,userController.UserUpdate);

router.delete('/Delete-User-profile/:id',authorizationTokenVerify ,userController.UserDelete);
router.delete('/allUserDelete', userController.AllUserDataDelete);

router.post('/reset-password-otp',userController.resetpassworsOtp);
router.post('/resetPassword', userController.VeriyOtp);
router.post('/logout', userController.LogOut);


module.exports = router; 