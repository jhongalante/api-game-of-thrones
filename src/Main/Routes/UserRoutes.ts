import { LoginController } from './../../Presentation/Controllers/User/LoginController/LoginController'
import { RegisterUserController } from './../../Presentation/Controllers/User/RegisterUser/RegisterUserController'
import { adaptRoute } from '../Adapters/Express/ExpressRouteAdapters'
import { Router } from 'express'
import { container } from 'tsyringe'

export default (router: Router): void => {
  router.post('/user', adaptRoute(container.resolve(RegisterUserController)))
  router.post('/user/login', adaptRoute(container.resolve(LoginController)))
}
