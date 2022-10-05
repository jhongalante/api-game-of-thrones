import { MySQLConnection } from './../../Infra/Db/MySQL/MySQLConnection'
import { DataTypes, Model, Optional } from 'sequelize'

interface UserAttributes {
  id: number
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number
  public email!: string
  public password!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize: MySQLConnection.connect()
})

export default User
