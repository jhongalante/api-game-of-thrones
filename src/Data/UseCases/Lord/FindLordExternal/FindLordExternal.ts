import { IFindLordExternal } from './../../../../Domain/UseCases/Lord/FindLordExternalUseCase'
import { singleton } from 'tsyringe'
import axios from 'axios'
import { ILordExternal } from '../../../../Domain/Models'

@singleton()
export class FindLordExternal implements IFindLordExternal {
  async find (name: string): Promise<ILordExternal> {
    const lord = await axios.get('https://www.anapioficeandfire.com/api/characters/', { params: { name } })
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
