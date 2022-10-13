import { IUser } from './../../../../../Domain/Models/User'
import { IFindUserByEmailRepository } from '../../../../../Data/Interfaces/Db/User/FindUserByEmailRepository'
import { singleton } from 'tsyringe'
import { MongoHelper } from '../../MongoHelper'

@singleton()
export class FindUserByEmailMongoRepository implements IFindUserByEmailRepository {
  async findByEmail (email: string): Promise<IUser> {
    try {
      const result = await MongoHelper.getCollection('Users').findOne<IUser>({ email })
      if (!result) return null
      return result
    } catch (error) {
      return error
    }
  }
}
