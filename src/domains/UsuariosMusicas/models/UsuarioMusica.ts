import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { Musica } from '../../Musicas/models/Musica';
import { Usuario } from '../../Usuarios/models/Usuario';

interface UsuarioMusica extends Model<InferAttributes<UsuarioMusica>, InferCreationAttributes<UsuarioMusica>> {
    id: CreationOptional<string>;
    idUsuario: string;
    idMusica: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>; 
  }

export const UsuarioMusica = sequelize.define<UsuarioMusica>('UsuarioMusica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Usuario,
          key: 'id'
        }
      },
      idMusica: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Musica,
          key: 'id'
        }
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

Musica.belongsToMany(Usuario, {
    through: UsuarioMusica,
});

Usuario.belongsToMany(Musica, {
    through: UsuarioMusica,
});

Musica.hasMany(UsuarioMusica);
UsuarioMusica.belongsTo(Musica);
Usuario.hasMany(UsuarioMusica);
UsuarioMusica.belongsTo(Usuario);

UsuarioMusica.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de UsuarioMusicas foi (re)criada');
    })
    .catch((err) => console.log(err));