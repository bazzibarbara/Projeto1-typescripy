import Artista from '../models/Artista.ts';
import Musica from '../../Musicas/models/Musica.ts';
import QueryError from '../../../../errors/QueryError.ts';

class ArtistasService {
  /**@brief Adiciona um artista ao banco de dados. */
  async adicionarArtista(body: any): Promise<void> {
    await Artista.create(body);
  }

  /**@brief Pesquisa e retorna todos os artistas do banco de dados. */
  async obterArtistas(): Promise<Artista[]> {
    return await Artista.findAll();
  }

  /**@brief Busca um artista no banco de dados pelo nome. */
  async obterArtistaPorNome(nome: string): Promise<Artista> {
    const artista = await Artista.findOne({ where: { nome } });

    if (!artista) {
      throw new QueryError('Artista nao encontrado.');
    }

    return artista;
  }

  async obterMusicasPorArtista(nome: string): Promise<Musica[]> {
    const artista = await Artista.findOne({ where: { nome }, include: [Musica] });

    if (!artista) {
      throw new QueryError('Artista nao encontrado.');
    }

    return artista.Musicas;
  }

  async editarFoto(nome: string, novafoto: string): Promise<void> {
    const artista = await Artista.findOne({ where: { nome } });

    if (!artista) {
      throw new QueryError('Artista nao encontrado.');
    }

    artista.foto = novafoto;
    await artista.save();
  }

  /**@brief Deleta uma artista filtrando pelo nome. */
  async deletarArtista(nome: string): Promise<void> {
    const artista = await Artista.findOne({ where: { nome } });

    if (!artista) {
      throw new QueryError('Artista nao encontrado.');
    }

    await Artista.destroy({ where: { nome } });
  }
}

export default new ArtistasService();
