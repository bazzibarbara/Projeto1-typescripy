import { Artista } from '../../Artistas/models/Artista';
import { Musica, MusicInterface } from '../models/Musica';
import { Attributes } from 'sequelize/types';
import { QueryError } from '../../../../errors/QueryError';

export class MusicaServiceClasse{

    /**@brief Deleta uma musica.*/
    async deletarMusica(nome: string){
        const musica = await Musica.findOne({ where: { titulo: nome } });

        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }

        musica.destroy();
    }

    async deletarMusicaPorId(id: string){
        const musica = await Musica.findByPk(id);

        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }

        musica.destroy();
    }

    
    async obterMusicas(){
        const musica = await Musica.findAll();

        if(!musica) throw new QueryError('Nenhuma musica disponivel.');

        return musica;
    }

    /**@brief Busca uma musica no banco de dados pelo nome.*/
    async obterMusicaPorNome(nome: string){
        const musica = await Musica.findOne({ where: { titulo: nome } });

        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }
            
        return musica;
    }

    async obterMusicaPorId(id: string){
        const musica = await Musica.findByPk(id);

        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }

        return musica;
    }

    async obterArtistaPorMusica(nome: string){
        const musica = await Musica.findOne({ where: { titulo: nome }, include: [Artista] });
        
        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }
            
        return musica;
    }

    /**@brief Adiciona uma musica ao banco.*/
    async adicionarMusica(req_body: Attributes<MusicInterface>){
        const { foto, titulo, categoria, idArtista } = req_body;
        await Musica.create({ foto, titulo, categoria, idArtista });
    }

    /**@brief Filtra uma musica pelo id e altera seus dados.*/
    async editarMusica(id: string, body: Attributes<MusicInterface>){
        const musica = await this.obterMusicaPorId(id);
        await musica.update(body);
    }

}

export const MusicaService = new MusicaServiceClasse();