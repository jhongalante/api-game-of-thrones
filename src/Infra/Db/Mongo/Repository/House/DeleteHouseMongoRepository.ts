import { singleton } from 'tsyringe'
import { MongoHelper } from '../../MongoHelper'
import { ObjectId } from 'mongodb'
import { IDeleteHouseRepository } from '../../../../../Data/Interfaces/Db/House/DeleteHouseRepository'

@singleton()
export class DeleteHouseMongoRepository implements IDeleteHouseRepository {
  async delete (id: string): Promise<void> {
    try {
      const houseCollection = MongoHelper.getCollection('Houses')
      await houseCollection.deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
      return error
    }
  }
}
