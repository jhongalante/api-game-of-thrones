export interface IDeleteHouseRepository {
  delete (id: string): Promise<void>
}
