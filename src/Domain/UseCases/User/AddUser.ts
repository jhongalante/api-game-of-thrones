import { UserInput, UserOutput } from './../../Models/UserModel'

export interface IAddUser {
  add (user: UserInput): Promise<UserOutput>
}
