/* eslint-disable no-unused-vars */
const UsuarioMusica = require('../models/UsuarioMusica');
const UsuarioService = require('../../Usuarios/service/UsuarioService');
const MusicaService = require('../../Musicas/services/MusicaService');
const Musica = require('../../Musicas/models/Musica');
const Usuario = require('../../Usuarios/models/Usuario');

class UsuarioMusicaService{
    async adicionarUsuarioMusica(idUsuario, idMusica){
        const usuario = await UsuarioService.obterUsuarioPorId(idUsuario);
        const musica = await MusicaService.obterMusicaPorId(idMusica);
        await UsuarioMusica.create({ idUsuario: usuario.id, idMusica: musica.id });
    }

    async obterMusicasPorUsuario(userId){
        const musicas = await Musica.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Usuario,
                where: { id: userId },
                through: { attributes: [] },
            }
        });
    
        return musicas;
    }
    
    async obterUsuariosPorMusica(songId){
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Musica,
                where: { id: songId },
                through: { attributes: [] },
            },
        });
    
        return usuarios;
    }

    async deletarUsuarioMusica(idUsuario, idMusica){
        const usuario = await UsuarioService.obterUsuarioPorId(idUsuario);
        const musica = await MusicaService.obterMusicaPorId(idMusica);
        await UsuarioMusica.destroy({
            where: {
                idUsuario: usuario.id,
                idMusica: musica.id,
            }
        });
    }
}

module.exports = new UsuarioMusicaService;