import { IUser } from './../../../../Domain/Models/User'
import { IFindUserByEmailRepository } from '../../../Interfaces/Db/User/FindUserByEmailRepository'
import { IFindUserByEmail } from '../../../../Domain/UseCases/User/FindUserByEmail'
import { inject, singleton } from 'tsyringe'
import { FindUserByEmailMongoRepository } from '../../../../Infra/Db/Mongo/Repository/User/FindUserByEmailMongoRepository'

@singleton()
export class DbFindUserByEmail implements IFindUserByEmail {
  constructor (@inject(FindUserByEmailMongoRepository) private readonly findUserByEmailRepository: IFindUserByEmailRepository) {}

  async findByEmail (email: string): Promise<IUser> {
    return await this.findUserByEmailRepository.findByEmail(email)
  }
}
