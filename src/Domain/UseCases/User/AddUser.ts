import { IUserInput, IUserOutput } from '../../Models'

export interface IAddUser {
  add (user: IUserInput): Promise<IUserOutput>
}
