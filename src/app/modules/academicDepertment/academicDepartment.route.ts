
import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controllers';




const router = express.Router()

router.post('/create-academic-department', validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema),  academicDepartmentController.createAcademicDepartment )

router.get('/', academicDepartmentController.getAllAcademicDepartment)
router.get('/:departmentId', academicDepartmentController.getSingleAcademicDepartment)

router.patch('/:departmentId', validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartmentController.updateAcademicDepartment)


export const academicDepartmentRoutes = router;