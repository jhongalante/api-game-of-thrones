import { IHouse } from './../../../../Domain/Models/House'
import { inject, singleton } from 'tsyringe'
import { IFindHouseById } from '../../../../Domain/UseCases/House/FindHouseById'
import { FindHouseByIdMongoRepository } from '../../../../Infra/Db/Mongo/Repository/House/FindHouseByIdMongoRepository'
import { IFindHouseByIdRepository } from '../../../Interfaces/Db/House/FindHouseByIdRepository'

@singleton()
export class DbFindHouseById implements IFindHouseById {
  constructor (
    @inject(FindHouseByIdMongoRepository) private readonly findHouseByIdRepository: IFindHouseByIdRepository) {}

  async findById (id: string): Promise<IHouse> {
    return await this.findHouseByIdRepository.findById(id)
  }
}
