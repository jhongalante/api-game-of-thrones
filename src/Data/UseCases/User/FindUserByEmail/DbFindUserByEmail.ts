import { IFindUserByEmailRepository } from '../../../Interfaces/Db/User/FindUserByEmailRepository'
import { IFindUserByEmail } from '../../../../Domain/UseCases/User/FindUserByEmail'
import { inject, singleton } from 'tsyringe'
import { IUserOutput } from '../../../../Domain/Models/User'
import { FindUserByEmailMongoRepository } from '../../../../Infra/Db/Mongo/Repository/User/FindUserByEmailMongoRepository'

@singleton()
export class DbFindUserByEmail implements IFindUserByEmail {
  constructor (@inject(FindUserByEmailMongoRepository) private readonly findUserByEmailRepository: IFindUserByEmailRepository) {}

  async findByEmail (email: string): Promise<IUserOutput> {
    return await this.findUserByEmailRepository.findByEmail(email)
  }
}
