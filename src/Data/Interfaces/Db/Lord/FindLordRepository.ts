import { LordOutput } from '../../../../Domain/Models/Lord'

export interface IFindLordRepository {
  add (name: string): Promise<LordOutput>
}
