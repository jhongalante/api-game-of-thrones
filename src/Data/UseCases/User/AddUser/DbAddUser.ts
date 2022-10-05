import { AddUserMySQLRepository } from './../../../../Infra/Db/MySQL/Repository/User/AddUserMySQLRepository'
import { IAddUserRepository } from './../../../Interfaces/Db/User/AddUserRepository'
import { UserInput, UserOutput } from './../../../../Domain/Models/UserModel'
import { IAddUser } from '../../../../Domain/UseCases/User/AddUser'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DbAddUser implements IAddUser {
  constructor (
    @inject(AddUserMySQLRepository) private readonly addUserRepository: IAddUserRepository) {}

  async add (user: UserInput): Promise<UserOutput> {
    return await this.addUserRepository.add(user)
  }
}
