import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthController.loginUser)

router.post('/change-password', auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin), validateRequest(AuthValidation.changePasswordValidationSchema), AuthController.changePassword)

router.post('/forget-password', validateRequest(AuthValidation.forgetPasswordValidationSchema), AuthController.forgetPassword)


router.post('/reset-password', validateRequest(AuthValidation.resetPasswordValidationSchema), AuthController.resetPassword)



export const AuthRoutes = router ;