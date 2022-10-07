import 'reflect-metadata'
import { DbFindHouseById } from './DbFindHouseById'
import { IFindHouseById } from './../../../../Domain/UseCases/House/FindHouseById'
import { ObjectId } from 'mongodb'
import { IFindHouseByIdRepository } from '../../../Interfaces/Db/House/FindHouseByIdRepository'
import { IHouse } from './../../../../Domain/Models/House'

describe('DbFindHouseById', () => {
  const makeFindHouseByIdMock = (): IHouse => ({
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

  const makeFindHouseByIdRepository = (): IFindHouseByIdRepository => {
    class FindHouseByIdRepositoryStub implements IFindHouseByIdRepository {
      async findById (id: string): Promise<IHouse> {
        const fakeFindedHouseModel = makeFindHouseByIdMock()
        return await new Promise(resolve => resolve(fakeFindedHouseModel))
      }
    }
    return new FindHouseByIdRepositoryStub()
  }

  interface SubTypes {
    sut: IFindHouseById
    findHouseByIdRepositoryStub: IFindHouseByIdRepository
  }

  const makeSut = (): SubTypes => {
    const findHouseByIdRepositoryStub = makeFindHouseByIdRepository()
    const sut = new DbFindHouseById(findHouseByIdRepositoryStub)
    return {
      sut,
      findHouseByIdRepositoryStub
    }
  }

  it('Should call find house by id at repository', async () => {
    const { sut, findHouseByIdRepositoryStub } = makeSut()
    const findSpyRepository = jest.spyOn(findHouseByIdRepositoryStub, 'findById')

    await sut.findById('123456789101213141516171')

    expect(findSpyRepository).toHaveBeenLastCalledWith('123456789101213141516171')
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, findHouseByIdRepositoryStub } = makeSut()
    jest.spyOn(findHouseByIdRepositoryStub, 'findById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.findById('123456789101213141516171')

    await expect(promise).rejects.toThrow()
  })

  it('Should find a student by academic record', async () => {
    const { sut } = makeSut()
    const findHouseByIdMock = makeFindHouseByIdMock()

    const result = await sut.findById('123456789101213141516171')

    expect(result).toEqual(findHouseByIdMock)
  })
})
