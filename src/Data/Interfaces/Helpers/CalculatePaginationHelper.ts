import { ICalculatePaginationHelperModel } from '../../../Domain/Models/CalculatePaginationHelperModel'
export interface ICalculatePaginationHelper {
  calculatePagination(page: number, size: number): ICalculatePaginationHelperModel

}
