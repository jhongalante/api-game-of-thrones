import { MongoHelper } from './../../MongoHelper'
import { IUserInput, IUserOutput } from './../../../../../Domain/Models/User'
import bcrypt from 'bcrypt'
import { IAddUserRepository } from '../../../../../Data/Interfaces/Db/User/AddUserRepository'
import { singleton } from 'tsyringe'

@singleton()
export class AddUserMongoRepository implements IAddUserRepository {
  async add (user: IUserInput): Promise<IUserOutput> {
    try {
      const userCollection = MongoHelper.getCollection('Users')
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = await bcrypt.hash(user.password, salt)
      return MongoHelper.mapInsertResult(await userCollection.insertOne({
        email: user.email,
        password: hashPassword
      }), user)
    } catch (error) {
      return error
    }
  }
}
