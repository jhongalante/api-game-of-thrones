import { IFindHouseByName } from './../../../../Domain/UseCases/House/FindHouseByName'
import { IHouse } from '../../../../Domain/Models/House'
import { inject, singleton } from 'tsyringe'
import { FindHouseByNameMongoRepository } from '../../../../Infra/Db/Mongo/Repository/House/FindHouseByNameMongoRepository'
import { IFindHouseByNameRepository } from '../../../Interfaces/Db/House/FindHouseByNameRepository'

@singleton()
export class DbFindHouseByName implements IFindHouseByName {
  constructor (
    @inject(FindHouseByNameMongoRepository) private readonly findHouseByNameRepository: IFindHouseByNameRepository) {}

  async findByName (name: string): Promise<IHouse> {
    return await this.findHouseByNameRepository.findByName(
      name[0].toLocaleUpperCase() + name.substring(1).toLocaleLowerCase())
  }
}
