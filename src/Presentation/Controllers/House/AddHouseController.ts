import { created } from './../../Helpers/Http/HttpHelpers'
import { IFindLordExternal } from './../../../Domain/UseCases/Lord/FindLordExternalUseCase'
import { FindLordExternal } from './../../../Data/UseCases/Lord/FindLordExternal/FindLordExternal'
import { IAddHouse } from './../../../Domain/UseCases/House/AddHouse'
import { DbAddHouse } from '../../../Data/UseCases/House/DbAddHouse/DbAddHouse'
import { inject, singleton } from 'tsyringe'
import { Controller, HttpRequest, HttpResponse } from '../../Protocols'
import { ServerError } from '../../Errors'
import { badRequest, internalServerError } from '../../Helpers/Http/HttpHelpers'
import { makeAddHouseValidationFactory } from '../../../Main/Factories/House/makeAddHouseValidationFactory'

@singleton()
export class AddHouseController implements Controller {
  constructor (
    @inject(DbAddHouse) private readonly addHouse: IAddHouse,
    @inject(FindLordExternal) private readonly findLordExternal: IFindLordExternal) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validation = makeAddHouseValidationFactory()
      const error = validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, region, yearFundation, actualLordName } = httpRequest.body
      const foundLord = await this.findLordExternal.find(actualLordName)
      if (!foundLord) {
        return badRequest('Lord informado não existe na base de personagens.')
      }

      const houseCreated = await this.addHouse.add({
        name,
        region,
        yearFundation,
        actualLord: {
          name: foundLord.name,
          tvSeries: foundLord.tvSeries
        }
      })

      return created(houseCreated)
    } catch (error) {
      console.error(error)
      return internalServerError(new ServerError(error))
    }
  }
}
