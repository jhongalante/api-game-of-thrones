import User, { UserInput, UserOutput } from './../../../../../Domain/Models/UserModel'
import bcrypt from 'bcrypt'
import { IAddUserRepository } from '../../../../../Data/Interfaces/Db/User/AddUserRepository'
import { singleton } from 'tsyringe'

@singleton()
export class AddUserMySQLRepository implements IAddUserRepository {
  async add (user: UserInput): Promise<UserOutput> {
    try {
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = await bcrypt.hash(user.password, salt)
      return await User.create(
        {
          email: user.email,
          password: hashPassword
        }
      )
    } catch (error) {
      return error
    }
  }
}
