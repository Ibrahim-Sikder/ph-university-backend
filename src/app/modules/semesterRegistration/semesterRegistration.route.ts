import express from 'express'
import validateRequest from '../../middlwares/validateRequest'
import { semesterRegistrationValidations } from './semesterRegistration.validation'
import { semesterRegistrationController } from './semesterRegistration.controller'

const router = express.Router()


router.post('/create-semester-registration', validateRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema),semesterRegistrationController.createSemesterRegistration)

router.get('/',semesterRegistrationController.getAllSemesterRegistration)
router.get('/:id',semesterRegistrationController.getSingleSemesterRegistration)

router.patch('/:id', validateRequest(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema),semesterRegistrationController.updateSemesterRegistration)


export const SemesterRegistrationRoutes = router