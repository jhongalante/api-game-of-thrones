import { IHouse } from '../../../../Domain/Models/House'

export interface IFindHouseByNameRepository {
  findByName (name: string): Promise<IHouse>
}
