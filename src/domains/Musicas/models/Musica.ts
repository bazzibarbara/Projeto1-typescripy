import { DataTypes, Model } from 'sequelize';
import database from '../../../../database/index';
import Artista from '../../Artistas/models/Artista';

class Musica extends Model {
  public id!: number;
  public foto!: string;
  public titulo!: string;
  public categoria!: string;
  public idArtista!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Musica.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idArtista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Musica',
  }
);

Artista.hasMany(Musica, {
  foreignKey: 'idArtista',
});

Musica.belongsTo(Artista, {
  constraint: true,
  foreignKey: 'idArtista',
});

Musica.sync({ alter: false, force: false })
  .then(() => {
    console.log('Tabela de Musicas foi (re)criada');
  })
  .catch((err) => console.log(err));

export default Musica;
