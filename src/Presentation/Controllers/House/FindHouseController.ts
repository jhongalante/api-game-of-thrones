import { inject, singleton } from 'tsyringe'
import { Controller, HttpRequest, HttpResponse } from '../../Protocols'
import { ServerError } from '../../Errors'
import { ok, internalServerError } from '../../Helpers/Http/HttpHelpers'
import { DbListHouse } from '../../../Data/UseCases/House/DbListHouse.ts/DbListHouse'
import { IListHouse } from '../../../Domain/UseCases/House/ListHouse'
import { DbFindHouseById } from '../../../Data/UseCases/House/DbFindHouseById/DbFindHouseById'
import { IFindHouseById } from '../../../Domain/UseCases/House/FindHouseById'
import { DbFindHouseByName } from '../../../Data/UseCases/House/DbFindHouseByName/DbFindHouseByName'
import { IFindHouseByName } from '../../../Domain/UseCases/House/FindHouseByName'

@singleton()
export class FindHouseController implements Controller {
  constructor (
    @inject(DbListHouse) private readonly addHouse: IListHouse,
    @inject(DbFindHouseById) private readonly findHouseById: IFindHouseById,
    @inject(DbFindHouseByName) private readonly findHouseByName: IFindHouseByName) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, pageSize, id, name } = httpRequest.query

      if (id) {
        return ok(await this.findHouseById.findById(id))
      }
      if (name) {
        return ok(await this.findHouseByName.findByName(name))
      }

      const houses = await this.addHouse.list(
        page ? parseInt(page) : page,
        pageSize ? parseInt(pageSize) : pageSize)

      return ok(houses)
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}
