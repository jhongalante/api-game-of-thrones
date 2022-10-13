import { IUser } from './../../../../Domain/Models/User'

export interface IFindUserByEmailRepository {
  findByEmail (email: string): Promise<IUser>
}
