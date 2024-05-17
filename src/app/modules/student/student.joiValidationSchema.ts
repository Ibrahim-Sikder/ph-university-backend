import Joi from 'joi' 

// Define Joi schemas for nested objects (userName, guardian, localGuardian)
const userNameSchema = Joi.object({
  firstName: Joi.string().required().error(new Error('First name is required')),
  middleName: Joi.string().allow('').optional(),
  lastName: Joi.string().required().error(new Error('Last name is required')),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required().error(new Error('Father name is required')),
  fatherOccupation: Joi.string().required().error(new Error('Father occupation is required')),
  fatherContactNo: Joi.string().required().error(new Error('Father contact number is required')),
  motherName: Joi.string().required().error(new Error('Mother name is required')),
  motherOccupation: Joi.string().required().error(new Error('Mother occupation is required')),
  motherContactNo: Joi.string().required().error(new Error('Mother contact number is required')),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required().error(new Error('Local guardian name is required')),
  contactNo: Joi.string().required().error(new Error('Local guardian contact number is required')),
  occupation: Joi.string().required().error(new Error('Local guardian occupation is required')),
  address: Joi.string().required().error(new Error('Local guardian address is required')),
});

// Define Joi schema for the main student object
export const studentJoiValidationSchema = Joi.object({
  id: Joi.string().allow('').optional(),
  password: Joi.string().allow('').optional(),
  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().error(new Error('Gender must be one of: male, female, other')),
  dateOfBirth: Joi.string().allow('').optional(),
  email: Joi.string().email().required().error(new Error('Valid email address is required')),
  contactNo: Joi.string().required().error(new Error('Contact number is required')),
  emergencyContactNo: Joi.string().required().error(new Error('Emergency contact number is required')),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required().error(new Error('Invalid blood group')),
  presentAddress: Joi.string().required().error(new Error('Present address is required')),
  permanentAddress: Joi.string().required().error(new Error('Permanent address is required')),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImage: Joi.string().allow('').optional(),
  isActive: Joi.string().valid('active', 'blocked').required().error(new Error('isActive must be one of: active, blocked')),
  isDeleted: Joi.boolean().default(false),
});


