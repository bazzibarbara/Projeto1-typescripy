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

        Musica.destroy({ where: { titulo: nome } });
    }

    
    async obterMusicas(){
        return await Musica.findAll();
    }

    /**@brief Busca uma musica no banco de dados pelo nome.*/
    async obterMusicaPorNome(nome){
        const musica = await Musica.findOne({ where: { titulo: nome } });

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

    /**@brief Filtra uma musica pelo nome e altera o seu numero de downloads.*/
    async editarFoto(nome, foto_str){
        const musica = await Musica.findOne({ where: { titulo: nome } });

        if (!musica){
            throw new QueryError('Musica nao encontrada.');
        }

        musica.foto = foto_str;
        await musica.save();
    }

}

module.exports = new MusicaService;