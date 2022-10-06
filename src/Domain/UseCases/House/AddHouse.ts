import { IHouse, IHouseInput } from './../../Models/House'

export interface IAddHouse {
  add (house: IHouseInput): Promise<IHouse>
}
