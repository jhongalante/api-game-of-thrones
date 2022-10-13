import { IUser } from '../../Models'

export interface IFindUserByEmail {
  findByEmail (email: string): Promise<IUser>
}
