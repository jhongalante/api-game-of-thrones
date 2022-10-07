import 'reflect-metadata'
import { DbFindHouseByName } from './DbFindHouseByName'
import { IFindHouseByName } from './../../../../Domain/UseCases/House/FindHouseByName'
import { ObjectId } from 'mongodb'
import { IFindHouseByNameRepository } from '../../../Interfaces/Db/House/FindHouseByNameRepository'
import { IHouse } from './../../../../Domain/Models/House'

describe('DbFindHouseByName', () => {
  const makeFindHouseByNameMock = (): IHouse => ({
    _id: new ObjectId('123456789101213141516171'),
    name: 'HouseName',
    region: 'HouseRegion',
    yearFundation: 1000,
    actualLord: {
      name: 'LordName',
      tvSeries: [
        '1',
        '2'
      ]
    }
  })

  const makeFindHouseByNameRepository = (): IFindHouseByNameRepository => {
    class FindHouseByNameRepositoryStub implements IFindHouseByNameRepository {
      async findByName (name: string): Promise<IHouse> {
        const fakeFindedHouseModel = makeFindHouseByNameMock()
        return await new Promise(resolve => resolve(fakeFindedHouseModel))
      }
    }
    return new FindHouseByNameRepositoryStub()
  }

  interface SubTypes {
    sut: IFindHouseByName
    findHouseByNameRepositoryStub: IFindHouseByNameRepository
  }

  const makeSut = (): SubTypes => {
    const findHouseByNameRepositoryStub = makeFindHouseByNameRepository()
    const sut = new DbFindHouseByName(findHouseByNameRepositoryStub)
    return {
      sut,
      findHouseByNameRepositoryStub
    }
  }

  it('Should call find house by name at repository', async () => {
    const { sut, findHouseByNameRepositoryStub } = makeSut()
    const findSpyRepository = jest.spyOn(findHouseByNameRepositoryStub, 'findByName')

    await sut.findByName('HouseName')

    expect(findSpyRepository).toHaveBeenLastCalledWith('Housename')
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, findHouseByNameRepositoryStub } = makeSut()
    jest.spyOn(findHouseByNameRepositoryStub, 'findByName').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.findByName('HouseName')

    await expect(promise).rejects.toThrow()
  })

  it('Should find a house by name', async () => {
    const { sut } = makeSut()
    const findHouseByNameMock = makeFindHouseByNameMock()

    const result = await sut.findByName('HouseName')

    expect(result).toEqual(findHouseByNameMock)
  })
})
