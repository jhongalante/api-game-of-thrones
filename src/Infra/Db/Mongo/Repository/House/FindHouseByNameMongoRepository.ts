import { IHouse } from '../../../../../Domain/Models'
import { singleton } from 'tsyringe'
import { MongoHelper } from '../../MongoHelper'
import { IFindHouseByNameRepository } from '../../../../../Data/Interfaces/Db/House/FindHouseByNameRepository'

@singleton()
export class FindHouseByNameMongoRepository implements IFindHouseByNameRepository {
  async findByName (name: string): Promise<IHouse> {
    try {
      const houseCollection = MongoHelper.getCollection('Houses')
      const result = await houseCollection.find({ name }).toArray()
      return MongoHelper.mapFindOne(result[0])
    } catch (error) {
      return error
    }
  }
}
