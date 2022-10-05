import { UserOutput } from './../../../../Domain/Models/UserModel'

export interface IFindUserByEmailRepository {
  findByEmail (email: string): Promise<UserOutput>
}
