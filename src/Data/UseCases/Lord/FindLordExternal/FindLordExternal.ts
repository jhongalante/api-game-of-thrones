import { IFindLordExternal } from './../../../../Domain/UseCases/Lord/FindLordExternalUseCase'
import { singleton } from 'tsyringe'
import axios from 'axios'
import { ILordExternal } from '../../../../Domain/Models/Lord'
const API_URI = process.env.API_ICEANDFIRE_URI
@singleton()
export class FindLordExternal implements IFindLordExternal {
  async find (name: string): Promise<ILordExternal> {
    const lord = await axios.get(API_URI + '/characters/', { params: { name } })
      .then((response) => {
        const character = response.data[0] as ILordExternal
        return character
      })
      .catch(error => {
        throw new Error(error)
      })
    return lord
  }
}
