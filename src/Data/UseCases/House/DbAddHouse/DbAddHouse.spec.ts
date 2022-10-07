import 'reflect-metadata'
import { IAddHouse } from './../../../../Domain/UseCases/House/AddHouse'
import { ObjectId } from 'mongodb'
import { IAddHouseRepository } from '../../../Interfaces/Db/House/AddHouseRepository'
import { IHouse, IHouseInput } from './../../../../Domain/Models/House'
import { DbAddHouse } from './DbAddHouse'

describe('DbAddHouse', () => {
  const makeAddHouseMock = (): IHouse => ({
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

  const makeAddHouseRepository = (): IAddHouseRepository => {
    class AddHouseRepositoryStub implements IAddHouseRepository {
      async add (house: IHouseInput): Promise<IHouse> {
        const fakeHouseModel = makeAddHouseMock()
        return await new Promise(resolve => resolve(fakeHouseModel))
      }
    }
    return new AddHouseRepositoryStub()
  }

  interface SubTypes {
    sut: IAddHouse
    addHouseRepositoryStub: IAddHouseRepository
  }

  const makeSut = (): SubTypes => {
    const addHouseRepositoryStub = makeAddHouseRepository()
    const sut = new DbAddHouse(addHouseRepositoryStub)
    return {
      sut,
      addHouseRepositoryStub
    }
  }

  it('Should call add house at repository', async () => {
    const { sut, addHouseRepositoryStub } = makeSut()
    const addSpyRepository = jest.spyOn(addHouseRepositoryStub, 'add')
    const addHouseMock = makeAddHouseMock()

    await sut.add(addHouseMock)

    expect(addSpyRepository).toHaveBeenLastCalledWith({
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
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, addHouseRepositoryStub } = makeSut()
    jest.spyOn(addHouseRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeAddHouseMock())

    await expect(promise).rejects.toThrow()
  })

  it('Should return a house', async () => {
    const { sut } = makeSut()
    const addHouseMock = makeAddHouseMock()

    const result = await sut.add(addHouseMock)

    expect(result).toEqual(makeAddHouseMock())
  })
})
