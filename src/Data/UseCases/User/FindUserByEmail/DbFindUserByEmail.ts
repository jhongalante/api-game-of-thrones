import { FindUserByEmailMySQLRepository } from './../../../../Infra/Db/MySQL/Repository/User/FindUserByEmailMySQLRepository'
import { UserOutput } from './../../../../Domain/Models/UserModel'
import { IFindUserByEmailRepository } from '../../../Interfaces/Db/User/FindUserByEmailRepository'
import { IFindUserByEmail } from '../../../../Domain/UseCases/User/FindUserByEmail'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DbFindUserByEmail implements IFindUserByEmail {
  constructor (@inject(FindUserByEmailMySQLRepository) private readonly findUserByEmailRepository: IFindUserByEmailRepository) {}

  async findByEmail (email: string): Promise<UserOutput> {
    return await this.findUserByEmailRepository.findByEmail(email)
  }
}
