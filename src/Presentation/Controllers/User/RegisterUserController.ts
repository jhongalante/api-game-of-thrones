import { makeRegisterUserValidation } from '../../../Main/Factories/User/RegisterUserValidationFactory'
import { DbFindUserByEmail } from '../../../Data/UseCases/User/FindUserByEmail/DbFindUserByEmail'
import { DbAddUser } from '../../../Data/UseCases/User/AddUser/DbAddUser'
import { IFindUserByEmail } from '../../../Domain/UseCases/User/FindUserByEmail'
import { IAddUser } from '../../../Domain/UseCases/User/AddUser'
import { ServerError } from '../../Errors'
import { badRequest, created, internalServerError } from '../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../Protocols'
import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { inject, singleton } from 'tsyringe'

dotenv.config()
@singleton()
export class RegisterUserController implements Controller {
  constructor (
    @inject(DbAddUser) private readonly addUser: IAddUser,
    @inject(DbFindUserByEmail) private readonly findUserByEmail: IFindUserByEmail) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validation = makeRegisterUserValidation()
      const error = validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const foundUser = await this.findUserByEmail.findByEmail(email)
      foundUser ?? badRequest('Usuário já cadastrado')

      const registeredUser = await this.addUser.add({
        email,
        password
      })
      const token = sign({
        userId: registeredUser._id,
        email: registeredUser.email
      },
      process.env.API_TOKEN,
      {
        expiresIn: '2h'
      })
      return created({
        user: registeredUser,
        token
      })
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}
