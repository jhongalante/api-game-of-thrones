import 'reflect-metadata'
import { DbListHouse } from './DbListHouse'
import { IListHouse } from './../../../../Domain/UseCases/House/ListHouse'
import { ObjectId } from 'mongodb'
import { IListHouseRepository } from '../../../Interfaces/Db/House/ListHouseRepository'
import { IHouse } from './../../../../Domain/Models/House'

describe('DbListHouse', () => {
  const makeListHouseMock = (): IHouse[] => ([
    {
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
    },
    {
      _id: new ObjectId('123456789101213141516172'),
      name: 'HouseName2',
      region: 'HouseRegion2',
      yearFundation: 1001,
      actualLord: {
        name: 'LordName2',
        tvSeries: [
          '1',
          '2',
          '3'
        ]
      }
    }
  ])

  const makeListHouseRepository = (): IListHouseRepository => {
    class ListHouseRepositoryStub implements IListHouseRepository {
      async list (): Promise<IHouse[]> {
        const fakeListHouseModel = makeListHouseMock()
        return await new Promise(resolve => resolve(fakeListHouseModel))
      }
    }
    return new ListHouseRepositoryStub()
  }

  interface SubTypes {
    sut: IListHouse
    listHouseRepositoryStub: IListHouseRepository
  }

  const makeSut = (): SubTypes => {
    const listHouseRepositoryStub = makeListHouseRepository()
    const sut = new DbListHouse(listHouseRepositoryStub)
    return {
      sut,
      listHouseRepositoryStub
    }
  }

  it('Should throw error if repository throws it', async () => {
    const { sut, listHouseRepositoryStub } = makeSut()
    jest.spyOn(listHouseRepositoryStub, 'list').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.list(0, 5)

    await expect(promise).rejects.toThrow()
  })

  it('Should return a list of houses', async () => {
    const { sut } = makeSut()
    const listHousesMock = makeListHouseMock()

    const result = await sut.list(0, 2)

    expect(result).toEqual(listHousesMock)
  })
})
