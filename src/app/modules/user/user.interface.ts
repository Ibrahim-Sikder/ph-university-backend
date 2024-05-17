import { USER_ROLE } from "./user.constant"

export interface TUser {
    id: string,
    // email: string,
    password: string,
    needsPasswordChange?: boolean,
    role: 'admin' | 'student' | 'faculty',
    status: 'in-progress' | 'blocked',
    isDeleted: boolean,
  }
  
  export type NewUser = {
    password: string,
    role: string,
    id:string
  }
  

  
  export type TUserRole = keyof typeof USER_ROLE;


  // export interface UserModel extends Model<TUser> {

  //   myStaticMethod(): number;
  // }
  