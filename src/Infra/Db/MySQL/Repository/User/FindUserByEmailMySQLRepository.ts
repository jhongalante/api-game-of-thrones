import User, { UserOutput } from './../../../../../Domain/Models/UserModel'
import { IFindUserByEmailRepository } from '../../../../../Data/Interfaces/Db/User/FindUserByEmailRepository'
import { singleton } from 'tsyringe'

@singleton()
export class FindUserByEmailMySQLRepository implements IFindUserByEmailRepository {
  async findByEmail (email: string): Promise<UserOutput> {
    try {
      return await User.findOne({ where: { email } })
    } catch (error) {
      return error
    }
  }
}
