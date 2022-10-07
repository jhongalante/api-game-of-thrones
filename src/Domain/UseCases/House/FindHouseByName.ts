import { IHouse } from '../../Models/House'

export interface IFindHouseByName {
  findByName (name: string): Promise<IHouse>
}
