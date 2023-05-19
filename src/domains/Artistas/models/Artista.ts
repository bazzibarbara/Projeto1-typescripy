import database from '../../../../database/index.ts';
import { DataTypes, Model } from 'sequelize';

interface ArtistaAttributes {
  id: number;
  nome: string;
  nacionalidade: string;
  foto: string;
}

class Artista extends Model<ArtistaAttributes> implements ArtistaAttributes {
  public id!: number;
  public nome!: string;
  public nacionalidade!: string;
  public foto!: string;
}

Artista.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nacionalidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: database,
    modelName: 'Artista',
    tableName: 'Artistas'
  }
);

Artista.sync({ alter: false, force: false })
  .then(() => {
    console.log('Tabela de Artistas foi (re)criada');
  })
  .catch((err: Error) => console.log(err));

export default Artista;
