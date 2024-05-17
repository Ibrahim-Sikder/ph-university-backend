import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';

const router = express.Router()

router.post('/create-offered-course', validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema), offeredCourseController.createOfferedCourse )

router.get('/',)




export const OfferedCourseRoutes = router;