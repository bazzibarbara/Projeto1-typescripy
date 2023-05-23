/* eslint-disable no-unused-vars */
import { UsuarioMusica } from '../models/UsuarioMusica';
import { UsuarioService } from '../../Usuarios/service/UsuarioService';
import { MusicaService } from '../../Musicas/services/MusicaService';
import { Musica } from '../../Musicas/models/Musica';
import { Usuario } from '../../Usuarios/models/Usuario';

export class UsuarioMusicaServiceClasse{
    async adicionarUsuarioMusica(idUsuario: string, idMusica: string){
        const usuario = await UsuarioService.obterUsuarioPorId(idUsuario);
        const musica = await MusicaService.obterMusicaPorId(idMusica);

        await UsuarioMusica.create({ idUsuario: usuario.id, idMusica: musica.id });
    }

    async obterMusicasPorUsuario(idUsuario: string){
        const musicas = await Musica.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                model: Usuario,
                where: { id: idUsuario },
                attributes: ['id'],
                through: { attributes: [] },
            }
        });
    
        return musicas;
    }
    
    async obterUsuariosPorMusica(idMusica: string){
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['senha', 'createdAt', 'updatedAt'] },
            include: {
                model: Musica,
                where: { id: idMusica },
                attributes: ['id'],
                through: { attributes: [] },
            },
        });
    
        return usuarios;
    }

    async deletarUsuarioMusica(idUsuario: string, idMusica: string){
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

export const UsuarioMusicaService = new UsuarioMusicaServiceClasse();