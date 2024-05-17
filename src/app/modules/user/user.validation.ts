import { z } from "zod";





// const userValidationSchema = z.object({
//     id: z.string(),
//     password: z.string().max(20,{message: 'Password can not be mor than 20 character. '}),
//     needsPasswordChange: z.boolean().optional(),
//     role: z.enum(['student', 'faculty', 'admin']),
//     status:z.enum([ 'in-progress', 'blocked']).default('in-progress'),
//     isDeleted: z.boolean().optional().default(false)
// })

// export const userValidations ={
//     userValidationSchema
// }

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: "Password must be string"
    }).max(20,{message: 'Password can not be more than 20 character'}).optional(),
    // needsPasswordChange: z.boolean().optional().default(true),
    // role: z.enum(['admin', 'student', 'faculty']),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    // isDeleted: z.boolean().optional().default(false)
})


export const UserValidations = {
userValidationSchema
}