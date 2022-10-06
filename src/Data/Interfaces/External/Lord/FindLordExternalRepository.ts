import { ILordExternalModel } from './../../../../Domain/Types/LordExternalModel'

export interface IFindLordExternalRepository {
  find (name: string): Promise<ILordExternalModel>
}
