import { IUserInput, IUserOutput } from '../../../../Domain/Models/User'

export interface IAddUserRepository {
  add (user: IUserInput): Promise<IUserOutput>
}
