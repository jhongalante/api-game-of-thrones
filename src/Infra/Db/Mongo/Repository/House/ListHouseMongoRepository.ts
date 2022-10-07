import { singleton } from 'tsyringe'
import { IListHouseRepository } from '../../../../../Data/Interfaces/Db/House/ListHouseRepository'
import { IHouse } from '../../../../../Domain/Models'
import { MongoHelper } from '../../MongoHelper'

@singleton()
export class ListHouseMongoRepository implements IListHouseRepository {
  async list (page: number = 0, pageSize: number = 10): Promise<IHouse[]> {
    try {
      const houseCollection = MongoHelper.getCollection('Houses')
      const skip = pageSize * page
      return await houseCollection.find({}).limit(pageSize).skip(skip).toArray() as IHouse[]
    } catch (error) {
      return error
    }
  }
}
