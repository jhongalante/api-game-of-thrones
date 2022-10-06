import { ObjectId } from 'mongodb'

export interface IUser {
  _id: ObjectId
  email: string
  password: string
}

export interface IUserInput {
  email: string
  password: string
}

export interface IUserOutput {
  _id: ObjectId
  email: string
}
