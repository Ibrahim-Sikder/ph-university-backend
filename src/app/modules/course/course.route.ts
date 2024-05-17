import express from 'express';
import { CourseValidations } from './course.validation';
import validateRequest from '../../middlwares/validateRequest';
import { CourseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/:id', CourseController.getSingleCourses);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.delete('/:id', CourseController.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseController.assignFacultiesWithCourse
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),CourseController.assignFacultiesWithCourse
);


router.get('/', CourseController.getAllCourses);

export const CourseRoutes = router;