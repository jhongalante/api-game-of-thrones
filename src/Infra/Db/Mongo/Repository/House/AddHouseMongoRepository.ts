import { IHouse, IHouseInput } from './../../../../../Domain/Models/House'
import { MongoHelper } from './../../MongoHelper'
import { singleton } from 'tsyringe'
import { IAddHouseRepository } from '../../../../../Data/Interfaces/Db/House/AddHouseRepository'

@singleton()
export class AddHouseMongoRepository implements IAddHouseRepository {
  async add (house: IHouseInput): Promise<IHouse> {
    try {
      const houseCollection = MongoHelper.getCollection('Houses')
      return MongoHelper.mapInsertResult(await houseCollection.insertOne({ ...house }), house)
    } catch (error) {
      return error
    }
  }
}
