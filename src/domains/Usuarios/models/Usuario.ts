import { DataTypes } from 'sequelize';
import { userRoles } from '../constants/userRoles.ts';
import database from '../../../../database/index.ts';

const Usuario = database.define('Usuario', {
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
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.ENUM(userRoles.admin, userRoles.user),
    allowNull: false,
  },
});

Usuario.sync({ alter: true, force: false })
  .then(() => {
    console.log('Tabela de Usuarios foi (re)criada');
  })
  .catch((err) => console.log(err));

export default Usuario;
