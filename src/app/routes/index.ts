import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { studentRouters } from '../modules/student/student.route'
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRoutes } from '../modules/academicDepertment/academicDepartment.route'
import { CourseRoutes } from '../modules/course/course.route'
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route'
import { OfferedCourseRoutes } from '../modules/offeredCourse/offeredCourse.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { EnrolledCourseRoutes } from '../modules/enrollCourse/enrollCourse.route'

const router = express.Router()

const modulesRoutes = [
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/students',
        route: studentRouters,
    },
    {
        path: '/academic-semesters',
        route: academicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: academicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartmentRoutes,
    },
    {
        path: '/faculties',
        route: userRoutes,
      },
      {
        path: '/admins',
        route: AdminRoutes,
      },
      {
        path: '/courses',
        route: CourseRoutes,
      },
      {
        path: '/semester-registration',
        route: SemesterRegistrationRoutes,
      },
      {
        path: '/offered-course',
        route: OfferedCourseRoutes,
      },
      {
        path: '/auth',
        route: AuthRoutes,
      },
      {
        path: '/enrolled-courses',
        route: EnrolledCourseRoutes,
      },
]

modulesRoutes.forEach(route=>router.use(route.path, route.route ))

export default router;