import 'reflect-metadata'
import { DbFindUserByEmail } from './DbFindUserByEmail'
import { IFindUserByEmail } from './../../../../Domain/UseCases/User/FindUserByEmail'
import { IUser } from './../../../../Domain/Models/User'
import { ObjectId } from 'mongodb'
import { IFindUserByEmailRepository } from '../../../Interfaces/Db/User/FindUserByEmailRepository'

describe('DbFindUserByEmail', () => {
  const makeAddUserOutputMock = (): IUser => ({
    _id: new ObjectId('123456789101213141516171'),
    email: 'teste@teste.com',
    password: '123456'
  })

  const makeFindUserByEmailRepository = (): IFindUserByEmailRepository => {
    class FindFindUserByEmailRepositoryStub implements IFindUserByEmailRepository {
      async findByEmail (email: string): Promise<IUser> {
        const fakeFindedUserModel = makeAddUserOutputMock()
        return await new Promise(resolve => resolve(fakeFindedUserModel))
      }
    }
    return new FindFindUserByEmailRepositoryStub()
  }

  interface SubTypes {
    sut: IFindUserByEmail
    findUserByEmailRepositoryStub: IFindUserByEmailRepository
  }

  const makeSut = (): SubTypes => {
    const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
    const sut = new DbFindUserByEmail(findUserByEmailRepositoryStub)
    return {
      sut,
      findUserByEmailRepositoryStub
    }
  }

  it('Should call find user by email at repository', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    const findSpyRepository = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')

    await sut.findByEmail('teste@teste.com')

    expect(findSpyRepository).toHaveBeenLastCalledWith('teste@teste.com')
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.findByEmail('teste@teste.com')

    await expect(promise).rejects.toThrow()
  })

  it('Should find a user by email', async () => {
    const { sut } = makeSut()
    const findUserByEmailMock = makeAddUserOutputMock()

    const result = await sut.findByEmail('teste@teste.com')

    expect(result).toEqual(findUserByEmailMock)
  })
})
