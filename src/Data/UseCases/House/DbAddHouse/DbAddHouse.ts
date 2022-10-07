import { IHouse, IHouseInput } from '../../../../Domain/Models/House'
import { inject, singleton } from 'tsyringe'
import { IAddHouse } from '../../../../Domain/UseCases/House/AddHouse'
import { IAddHouseRepository } from '../../../Interfaces/Db/House/AddHouseRepository'
import { AddHouseMongoRepository } from '../../../../Infra/Db/Mongo/Repository/House/AddHouseMongoRepository'

@singleton()
export class DbAddHouse implements IAddHouse {
  constructor (
    @inject(AddHouseMongoRepository) private readonly addHouseRepository: IAddHouseRepository) {}

  async add (house: IHouseInput): Promise<IHouse> {
    return await this.addHouseRepository.add(house)
  }
}
