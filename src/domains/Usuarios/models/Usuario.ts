import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { userRoles } from '../constants/userRoles';

export interface UserInterface extends Model<InferAttributes<UserInterface>, InferCreationAttributes<UserInterface>> {
    id: CreationOptional<string>;
    nome: string;
    email: string;
    senha: string;
    cargo: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
  }

export const Usuario = sequelize.define<UserInterface>('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        },
        nome: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
        senha: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        cargo: {
        type: DataTypes.ENUM,
        values: [userRoles.admin, userRoles.user],
        allowNull: false,
        },
        createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        },
        updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        },
    });

Usuario.sync({alter: true, force: false})
    .then(() => {
        console.log('Tabela de Usuarios foi (re)criada');
    })
    .catch((err) => console.log(err));

module.exports = Usuario;