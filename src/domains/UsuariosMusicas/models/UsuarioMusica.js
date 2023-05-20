const database = require('../../../../database/index');
const {DataTypes} = require('sequelize');
const Usuario = require('../../Usuarios/models/Usuario');
const Musica = require('../../Musicas/models/Musica');

const UsuarioMusica = database.define('UsuarioMusica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
});

Musica.belongsToMany(Usuario, {
    through: UsuarioMusica,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Usuario.belongsToMany(Musica, {
    through: UsuarioMusica,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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

module.exports = UsuarioMusica;