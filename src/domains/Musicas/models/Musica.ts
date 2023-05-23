import { sequelize } from '../../../../database/index';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin} from 'sequelize';
import { Artista } from '../../Artistas/models/Artista';
import { UserInterface } from '../../Usuarios/models/Usuario';

export interface MusicInterface extends Model<InferAttributes<MusicInterface>, InferCreationAttributes<MusicInterface>> {
    id: CreationOptional<string>;
    titulo: string;
    foto: string;
    idArtista: string;
    categoria: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
    adicionaUsuario: HasManyAddAssociationMixin<UserInterface, UserInterface['id']>;
    removeUsuario: HasManyRemoveAssociationMixin<UserInterface, UserInterface['id']>;
  }

export const Musica = sequelize.define<MusicInterface>('Musica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    foto: {
        type: DataTypes.STRING,
        allowNull: false
    },

    idArtista: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    categoria: {
        type: DataTypes.STRING,
        allowNull: false
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

Artista.hasMany(Musica, {
    foreignKey: 'idArtista'
});

Musica.belongsTo(Artista, {
    foreignKey: 'idArtista'
});


Musica.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Musicas foi (re)criada');
    })
    .catch((err) => console.log(err));
