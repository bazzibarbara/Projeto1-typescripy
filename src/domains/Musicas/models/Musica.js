const database = require('../../../../database/index');
const {DataTypes} = require('sequelize');
const Artista = require('../../Artistas/models/Artista');

const Musica = database.define('Musica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    foto: {
        type: DataTypes.STRING,
        allowNull: false
    },

    titulo: {
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
    }
});

Artista.hasMany(Musica, {
    foreignKey: 'idArtista'
});

Musica.belongsTo(Artista, {
    constraint: true,
    foreignKey: 'idArtista'
});


Musica.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Musicas foi (re)criada');
    })
    .catch((err) => console.log(err));

module.exports = Musica;