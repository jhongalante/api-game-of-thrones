import { ILordExternal } from '../../../../Domain/Models'

export interface IFindLordExternalRepository {
  find (name: string): Promise<ILordExternal>
}
