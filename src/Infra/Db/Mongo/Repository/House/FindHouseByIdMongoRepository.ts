import { IHouse } from '../../../../../Domain/Models'
import { IFindHouseByIdRepository } from '../../../../../Data/Interfaces/Db/House/FindHouseByIdRepository'
import { singleton } from 'tsyringe'
import { MongoHelper } from '../../MongoHelper'
import { ObjectId } from 'mongodb'

@singleton()
export class FindHouseByIdMongoRepository implements IFindHouseByIdRepository {
  async findById (id: string): Promise<IHouse> {
    try {
      const houseCollection = MongoHelper.getCollection('Houses')
      const result = await houseCollection.find({ _id: new ObjectId(id) }).toArray()
      return MongoHelper.mapFindOne(result[0])
    } catch (error) {
      return error
    }
  }
}
