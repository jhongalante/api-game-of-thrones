import { ObjectId } from 'mongodb'
import { ILord } from './Lord'

export interface IHouse {
  _id: ObjectId
  name: string
  region: string
  yearFundation: number
  actualLord: ILord
}

export interface IHouseInput {
  name: string
  region: string
  yearFundation: number
  actualLord: ILord
}
