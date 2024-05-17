import { Days } from './offeredCourse.constant'
import { TOfferedCourse } from './offeredCourse.interface'
import mongoose, { Schema, model } from 'mongoose'

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SemesterRegistration',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicSemester',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicDepartment',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Faculty',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'CourseFaculty',
  },
  days: [
    {
      type: String,
      enum: Days,
    },
  ],
  maxCapacity: {
    type: Number,
    default: 10,
  },
  section: {
    type: Number,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
})

export const OfferedCourse = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
)
