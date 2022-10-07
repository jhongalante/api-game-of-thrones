import { ILordExternal } from '../../Models/Lord'

export interface IFindLordExternal {
  find (name: string): Promise<ILordExternal>
}
