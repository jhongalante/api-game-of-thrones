import { ListHouseController } from './../../Presentation/Controllers/House/ListHouseController'
import { AddHouseController } from './../../Presentation/Controllers/House/AddHouseController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../Adapters/Express/ExpressRouteAdapters'

export default (router: Router): void => {
  router.post('/house', adaptRoute(container.resolve(AddHouseController)))
  router.get('/house', adaptRoute(container.resolve(ListHouseController)))
}
