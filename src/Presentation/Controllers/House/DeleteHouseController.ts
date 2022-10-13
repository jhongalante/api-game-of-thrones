import { DbDeleteHouse } from './../../../Data/UseCases/House/DbDeleteHouse/DbDeleteHouse'
import { inject, singleton } from 'tsyringe'
import { Controller, HttpRequest, HttpResponse } from '../../Protocols'
import { ServerError } from '../../Errors'
import { ok, internalServerError } from '../../Helpers/Http/HttpHelpers'
import { IDeleteHouse } from '../../../Domain/UseCases/House/DeleteHouse'

@singleton()
export class DeleteHouseController implements Controller {
  constructor (
    @inject(DbDeleteHouse) private readonly deleteHouse: IDeleteHouse) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const houseDeleted = await this.deleteHouse.delete(id)

      return ok(houseDeleted)
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}
