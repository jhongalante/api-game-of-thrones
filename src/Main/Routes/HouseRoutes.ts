import { Router } from 'express'
import { container } from 'tsyringe'
import { AddHouseController } from '../../Presentation/Controllers/House/AddHouseController'
import { DeleteHouseController } from '../../Presentation/Controllers/House/DeleteHouseController'
import { FindHouseController } from '../../Presentation/Controllers/House/FindHouseController'
import { adaptRoute } from '../Adapters/Express/ExpressRouteAdapters'
import { Auth } from '../Middlewares/Auth'

export default (router: Router): void => {
  router.post('/house', Auth, adaptRoute(container.resolve(AddHouseController)))
  router.get('/house', Auth, adaptRoute(container.resolve(FindHouseController)))
  router.delete('/house/:id', Auth, adaptRoute(container.resolve(DeleteHouseController)))
}
