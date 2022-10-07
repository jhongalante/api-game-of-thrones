import { IHouse } from '../../Models/House'

export interface IFindHouseById {
  findById (id: string): Promise<IHouse>
}
