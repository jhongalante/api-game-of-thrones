import { makeLoginValidation } from '../../../Main/Factories/User/LoginValidationFactory'
import { DbFindUserByEmail } from '../../../Data/UseCases/User/FindUserByEmail/DbFindUserByEmail'
import { IFindUserByEmail } from '../../../Domain/UseCases/User/FindUserByEmail'
import { ServerError } from '../../Errors'
import { badRequest, internalServerError, ok } from '../../Helpers/Http/HttpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { inject, singleton } from 'tsyringe'

dotenv.config()

@singleton()
export class LoginController implements Controller {
  constructor (
    @inject(DbFindUserByEmail) private readonly findUserByEmail: IFindUserByEmail) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validation = makeLoginValidation()
      const error = validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const foundUser = await this.findUserByEmail.findByEmail(email)
      const comparedPassword = foundUser ? bcrypt.compareSync(password, foundUser.password) : false

      if (!foundUser || !comparedPassword) {
        return badRequest('Email ou senha incorretos!')
      }

      const token = sign({
        userId: foundUser.id,
        email: foundUser.email
      },
      process.env.API_TOKEN,
      {
        expiresIn: '2h'
      })

      return ok({
        user: { id: foundUser.id, email: foundUser.email },
        token
      })
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}
