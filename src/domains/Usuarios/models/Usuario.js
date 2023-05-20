const database = require('../../../../database/index');
const {DataTypes} = require('sequelize');
const userRoles = require('../constants/userRoles.js');

const Usuario = database.define('Usuario', {
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

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cargo: {
        type: DataTypes.ENUM,
        values: [userRoles.admin, userRoles.user],
        allowNull: false
    }
});

Usuario.sync({alter: true, force: false})
    .then(() => {
        console.log('Tabela de Usuarios foi (re)criada');
    })
    .catch((err) => console.log(err));

module.exports = Usuario;