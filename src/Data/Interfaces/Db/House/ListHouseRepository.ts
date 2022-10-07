import { IHouse } from '../../../../Domain/Models/House'

export interface IListHouseRepository {
  list (page: number, pageSize: number): Promise<IHouse[]>
}
