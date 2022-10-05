import { UserInput, UserOutput } from '../../../../Domain/Models/UserModel'

export interface IAddUserRepository {
  add (user: UserInput): Promise<UserOutput>
}
