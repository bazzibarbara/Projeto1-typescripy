import Artista from '../../Artistas/models/Artista.ts';
import Musica from '../models/Musica.ts';
import QueryError from '../../../../errors/QueryError.ts';

class MusicaService {
  /**@brief Deleta uma música.*/
  async deletarMusica(nome: string): Promise<void> {
    const musica = await Musica.findOne({ where: { titulo: nome } });

    if (!musica) {
      throw new QueryError('Música não encontrada.');
    }

    await Musica.destroy({ where: { titulo: nome } });
  }

  async obterMusicas(): Promise<Musica[]> {
    return await Musica.findAll();
  }

  /**@brief Busca uma música no banco de dados pelo nome.*/
  async obterMusicaPorNome(nome: string): Promise<Musica> {
    const musica = await Musica.findOne({ where: { titulo: nome } });

    if (!musica) {
      throw new QueryError('Música não encontrada.');
    }

    return musica;
  }

  async obterArtistaPorMusica(nome: string): Promise<string> {
    const musica = await Musica.findOne({ where: { titulo: nome }, include: [Artista] });

    if (!musica) {
      throw new QueryError('Música não encontrada.');
    }

    return musica.Artistum.nome;
  }

  /**@brief Adiciona uma música ao banco.*/
  async adicionarMusica(req_body: {
    foto: string;
    titulo: string;
    categoria: string;
    idArtista: number;
  }): Promise<void> {
    const { foto, titulo, categoria, idArtista } = req_body;
    await Musica.create({ foto, titulo, categoria, idArtista });
  }

  /**@brief Filtra uma música pelo nome e altera a sua foto.*/
  async editarFoto(nome: string, foto_str: string): Promise<void> {
    const musica = await Musica.findOne({ where: { titulo: nome } });

    if (!musica) {
      throw new QueryError('Música não encontrada.');
    }

    musica.foto = foto_str;
    await musica.save();
  }
}

export default new MusicaService();
