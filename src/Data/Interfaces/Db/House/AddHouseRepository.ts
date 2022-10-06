import { IHouseModel } from './../../../../Domain/Types/HouseModel'

export interface IAddHouseRepository {
  add (user: IHouseModel): Promise<IHouseModel>
}
