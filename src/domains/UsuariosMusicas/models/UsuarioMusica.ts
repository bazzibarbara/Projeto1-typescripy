import { DataTypes } from 'sequelize';
import database from '../../../../database/index.ts';
import Usuario from '../../Usuarios/models/Usuario.ts';
import Musica from '../../Musicas/models/Musica.ts';

const UsuarioMusica = database.define('UsuarioMusica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idMusica: {
    type: DataTypes.INTEGER,
    references: {
      model: Musica,
      key: 'id',
    },
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
});

Musica.belongsToMany(Usuario, { through: UsuarioMusica });
Usuario.belongsToMany(Musica, { through: UsuarioMusica });

UsuarioMusica.sync({ alter: false, force: false })
  .then(() => {
    console.log('Tabela de UsuarioMusicas foi (re)criada');
  })
  .catch((err) => console.log(err));

export default UsuarioMusica;
