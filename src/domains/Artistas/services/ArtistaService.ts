import { Artista, ArtistInterface } from '../models/Artista';
import { Musica } from '../../Musicas/models/Musica';
import { QueryError } from '../../../../errors/QueryError';
import { Attributes } from 'sequelize/types';

export class ArtistasServiceClasse{
    /**@brief Adiciona um artista ao banco de dados. */
    async adicionarArtista(body: Attributes<ArtistInterface>){
        await Artista.create(body);
    }

    /**@brief Pesquisa e retorna todos os artistas do banco de dados. */
    async obterArtistas(){
        const artistas = await Artista.findAll();

        if(!artistas) throw new QueryError('Nenhum artista disponível.');

        return artistas;
    }

    /**@brief Busca um artista no banco de dados pelo nome. */
    async obterArtistaPorNome(nome: string){
        const artista = await Artista.findOne({ where: { nome: `${nome}`} });

        if (!artista){
            throw new QueryError('Artista nao encontrado.');
        }
            
        return artista;
    }

    async obterArtistaPorId(id: string){
        const artista = await Artista.findByPk(id);

        if (!artista){
            throw new QueryError('Artista nao encontrado.');
        }

        return artista;
    }

    async obterMusicasPorArtista(nome: string){
        const artista = await Artista.findOne({ where: { nome: nome }, include: [Musica] });

        if (!artista){
            throw new QueryError('Artista nao encontrado.');
        }
            
        return artista;
    }

    async editarArtista(id: string, body: Attributes<ArtistInterface>){
        const artista = await this.obterArtistaPorId(id);
        await artista.update(body);
    }

    /**@brief Deleta uma artista filtrando pelo nome. */
    async deletarArtista(id: string){
        const artista = await Artista.findByPk(id);

        if (!artista){
            throw new QueryError('Artista nao encontrado.');
        }

        artista.destroy();
    }
}

export const ArtistaService = new ArtistasServiceClasse();