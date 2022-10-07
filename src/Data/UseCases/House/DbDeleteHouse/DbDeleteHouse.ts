import { inject, singleton } from 'tsyringe'
import { IDeleteHouse } from '../../../../Domain/UseCases/House/DeleteHouse'
import { DeleteHouseMongoRepository } from '../../../../Infra/Db/Mongo/Repository/House/DeleteHouseMongoRepository'
import { IDeleteHouseRepository } from '../../../Interfaces/Db/House/DeleteHouseRepository'

@singleton()
export class DbDeleteHouse implements IDeleteHouse {
  constructor (
    @inject(DeleteHouseMongoRepository) private readonly deleteHouseRepository: IDeleteHouseRepository) {}

  async delete (id: string): Promise<void> {
    return await this.deleteHouseRepository.delete(id)
  }
}
