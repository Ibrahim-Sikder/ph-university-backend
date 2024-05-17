/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
})

export const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String,unique: true },
    user:{
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref:'User'
    },
    password: {
      type: String,
  
    },
    name: userNameSchema,
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female', 'other'],
    },
    dateOfBirth: String,
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImage: { type: String },
    admissionSemester:{
      type : Schema.Types.ObjectId,
      ref: 'AcademicSemester'
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    // isActive: {
    //   type: String,
    //   enum: ['active', 'blocked'],
    // },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
})
//pre same middleware
studentSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )

  next()
})

studentSchema.post('save', function (doc, next) {
  doc.password = ''

  next()
})

// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// creating a custom instant method
// studentSchema.methods.isUserExists = async function(id:string){
//   const existingUser = await Student.findOne({id})
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
