import { IListHouseRepository } from './../../../Interfaces/Db/House/ListHouseRepository'
import { IHouse } from './../../../../Domain/Models/House'
import { inject, singleton } from 'tsyringe'
import { IListHouse } from '../../../../Domain/UseCases/House/ListHouse'
import { ListHouseMongoRepository } from '../../../../Infra/Db/Mongo/Repository/House/ListHouseMongoRepository'

@singleton()
export class DbListHouse implements IListHouse {
  constructor (
    @inject(ListHouseMongoRepository) private readonly listHouseRepository: IListHouseRepository) {}

  async list (page: number, pageSize: number): Promise<IHouse[]> {
    return await this.listHouseRepository.list(page, pageSize)
  }
}
