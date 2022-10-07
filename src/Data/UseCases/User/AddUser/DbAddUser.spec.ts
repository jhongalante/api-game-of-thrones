import 'reflect-metadata'
import { DbAddUser } from './DbAddUser'
import { IAddUser } from './../../../../Domain/UseCases/User/AddUser'
import { IUserOutput, IUserInput } from './../../../../Domain/Models/User'
import { ObjectId } from 'mongodb'
import { IAddUserRepository } from '../../../Interfaces/Db/User/AddUserRepository'

describe('DbAddUser', () => {
  const makeAddUserOutputMock = (): IUserOutput => ({
    _id: new ObjectId('123456789101213141516171'),
    email: 'teste@teste.com'
  })
  const makeAddUserInputMock = (): IUserInput => ({
    email: 'teste@teste.com',
    password: '123456'
  })

  const makeAddUserRepository = (): IAddUserRepository => {
    class AddUserRepositoryStub implements IAddUserRepository {
      async add (user: IUserInput): Promise<IUserOutput> {
        const fakeUserModel = makeAddUserOutputMock()
        return await new Promise(resolve => resolve(fakeUserModel))
      }
    }
    return new AddUserRepositoryStub()
  }

  interface SubTypes {
    sut: IAddUser
    addUserRepositoryStub: IAddUserRepository
  }

  const makeSut = (): SubTypes => {
    const addUserRepositoryStub = makeAddUserRepository()
    const sut = new DbAddUser(addUserRepositoryStub)
    return {
      sut,
      addUserRepositoryStub
    }
  }

  it('Should call add user at repository', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addSpyRepository = jest.spyOn(addUserRepositoryStub, 'add')
    const addUserMock = makeAddUserInputMock()

    await sut.add(addUserMock)

    expect(addSpyRepository).toHaveBeenLastCalledWith(makeAddUserInputMock())
  })

  it('Should throw error if repository throws it', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeAddUserInputMock())

    await expect(promise).rejects.toThrow()
  })

  it('Should return a user logged in', async () => {
    const { sut } = makeSut()
    const addUserMock = makeAddUserInputMock()

    const result = await sut.add(addUserMock)

    expect(result).toEqual(makeAddUserOutputMock())
  })
})
