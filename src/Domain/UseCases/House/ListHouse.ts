import { IHouse } from '../../Models/House'

export interface IListHouse {
  list (page: number, pageSize: number): Promise<IHouse[]>
}
