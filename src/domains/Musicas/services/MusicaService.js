const Artista = require('../../Artistas/models/Artista');
const Musica = require('../models/Musica');

const QueryError = require('../../../../errors/QueryError');

class MusicaService{

    /**@brief Deleta uma musica.*/
    async deletarMusica(nome){
        const musica = await Musica.findOne({ where: { titulo: nome } });

        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }

        musica.destroy();
    }

    async deletarMusicaPorId(id){
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
    async obterMusicaPorNome(nome){
        const musica = await Musica.findOne({ where: { titulo: nome } });

        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }
            
        return musica;
    }

    async obterMusicaPorId(id){
        const musica = await Musica.findByPk(id);

        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }

        return musica;
    }

    async obterArtistaPorMusica(nome){
        const musica = await Musica.findOne({ where: { titulo: nome }, include: [Artista] });
        
        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }
            
        return musica.Artistum.nome;
    }

    /**@brief Adiciona uma musica ao banco.*/
    async adicionarMusica(req_body){
        const { foto, titulo, categoria, idArtista } = req_body;
        await Musica.create({ foto, titulo, categoria, idArtista });
    }

    /**@brief Filtra uma musica pelo id e altera seus dados.*/
    async editarMusica(id, body){
        const musica = await this.obterMusicaPorId(id);
        await musica.update(body);
    }

}

module.exports = new MusicaService;