import { IHouse, IHouseInput } from './../../../../Domain/Models/House'

export interface IAddHouseRepository {
  add (user: IHouseInput): Promise<IHouse>
}
