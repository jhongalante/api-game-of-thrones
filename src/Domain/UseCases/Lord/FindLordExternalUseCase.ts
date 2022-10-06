import { ILordExternal } from '../../Models'
export interface IFindLordExternal {
  find (name: string): Promise<ILordExternal>
}
