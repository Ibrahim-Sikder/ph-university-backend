
import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlwares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router()


router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcdemicSemesterValidationSchema), academicSemesterController.createAcademicSemester)

router.get('/', auth(USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty), academicSemesterController.getAllAcademicSemester)
router.get('/:semesterId', academicSemesterController.getSingleAcademicSemester)

router.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    academicSemesterController.updateAcademicSemester,
  );



export const academicSemesterRoutes = router