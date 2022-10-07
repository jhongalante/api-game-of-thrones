import { inject, singleton } from 'tsyringe'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ServerError } from '../../Errors'
import { ok, internalServerError } from '../../Helpers/Http/HttpHelpers'
import { DbListHouse } from '../../../Data/UseCases/House/DbListHouse.ts/DbListHouse'
import { IListHouse } from '../../../Domain/UseCases/House/ListHouse'

@singleton()
export class ListHouseController implements Controller {
  constructor (
    @inject(DbListHouse) private readonly addHouse: IListHouse) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, pageSize } = httpRequest.query
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
