import express from 'express';
import validateRequest from '../../middlwares/validateRequest';

import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router()

router.post('/create-academic-faculties', validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), academicFacultyController.createAcademicFaculty)

router.get('/', academicFacultyController.getAllAcademicFaculty)
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty)

router.patch('/:facultyId', validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema), academicFacultyController.updateAcademicFaculty)


export const academicFacultyRoutes = router;