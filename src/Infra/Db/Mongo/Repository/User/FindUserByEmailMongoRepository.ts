import { IFindUserByEmailRepository } from '../../../../../Data/Interfaces/Db/User/FindUserByEmailRepository'
import { singleton } from 'tsyringe'
import { IUserOutput } from '../../../../../Domain/Models/User'
import { MongoHelper } from '../../MongoHelper'

@singleton()
export class FindUserByEmailMongoRepository implements IFindUserByEmailRepository {
  async findByEmail (email: string): Promise<IUserOutput> {
    try {
      const result = await MongoHelper.getCollection('Users').findOne<IUserOutput>({ email })
      if (!result) return null
      return result
    } catch (error) {
      return error
    }
  }
}
