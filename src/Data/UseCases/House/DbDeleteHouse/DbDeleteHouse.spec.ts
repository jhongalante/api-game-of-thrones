import 'reflect-metadata'
import { DbDeleteHouse } from './DbDeleteHouse'
import { IDeleteHouse } from './../../../../Domain/UseCases/House/DeleteHouse'
import { IDeleteHouseRepository } from '../../../Interfaces/Db/House/DeleteHouseRepository'

describe('DbDeleteHouse', () => {
  const makeDeleteHouseRepository = (): IDeleteHouseRepository => {
    class DeleteHouseRepositoryStub implements IDeleteHouseRepository {
      async delete (id: string): Promise<void> {}
    }
    return new DeleteHouseRepositoryStub()
  }

  interface SubTypes {
    sut: IDeleteHouse
    deleteHouseRepositoryStub: IDeleteHouseRepository
  }

  const makeSut = (): SubTypes => {
    const deleteHouseRepositoryStub = makeDeleteHouseRepository()
    const sut = new DbDeleteHouse(deleteHouseRepositoryStub)
    return {
      sut,
      deleteHouseRepositoryStub
    }
  }

  it('Should call delete house from repository', async () => {
    const { sut, deleteHouseRepositoryStub } = makeSut()
    const deleteSpyRepository = jest.spyOn(deleteHouseRepositoryStub, 'delete')

    await sut.delete('123456789101213141516171')

    expect(deleteSpyRepository).toHaveBeenLastCalledWith('123456789101213141516171')
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, deleteHouseRepositoryStub } = makeSut()
    jest.spyOn(deleteHouseRepositoryStub, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.delete('123456789101213141516171')

    await expect(promise).rejects.toThrow()
  })

  it('Should delete a house', async () => {
    const { sut } = makeSut()

    const result = await sut.delete('123456789101213141516171')

    expect(result).toEqual(undefined)
  })
})
