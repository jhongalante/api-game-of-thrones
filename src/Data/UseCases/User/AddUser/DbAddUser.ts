import { IAddUserRepository } from './../../../Interfaces/Db/User/AddUserRepository'
import { IAddUser } from '../../../../Domain/UseCases/User/AddUser'
import { inject, singleton } from 'tsyringe'
import { AddUserMongoRepository } from '../../../../Infra/Db/Mongo/Repository/User/AddUserMongoRepository'
import { IUserInput, IUserOutput } from '../../../../Domain/Models/User'

@singleton()
export class DbAddUser implements IAddUser {
  constructor (
    @inject(AddUserMongoRepository) private readonly addUserRepository: IAddUserRepository) {}

  async add (user: IUserInput): Promise<IUserOutput> {
    return await this.addUserRepository.add(user)
  }
}
