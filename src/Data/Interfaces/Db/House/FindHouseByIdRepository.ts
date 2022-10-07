import { IHouse } from '../../../../Domain/Models/House'

export interface IFindHouseByIdRepository {
  findById (id: string): Promise<IHouse>
}
