/* eslint-disable @typescript-eslint/no-explicit-any */
import { Musica } from '../models/Musica';
import { MusicaService } from './MusicaService';
import { MusicInterface } from '../models/Musica';

jest.mock('../models/Musica', () => ({
    Musica: {
        update: jest.fn(),
        findByPk: jest.fn(),
    },
}));

describe('atualiza', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
  
    test('método recebe um id e as informacoes da musica a ser alterada => chama o update com os dados certos', async () => {
      const id = '1';
  
      const mockMusica = {
        titulo: 'musica1',
        foto: 'foto1',
        idArtista: '1',
        categoria: 'Rap',
      } as MusicInterface;
  
      const musica = {
        id: '1',
        titulo: 'musica1',
        foto: 'foto1',
        idArtista: '1',
        categoria: 'Rap',
        update: jest.fn(),
      };
  
      (Musica.findByPk as any).mockResolvedValue(musica);
      (Musica.update as any).mockResolvedValue({});
      
      await MusicaService.editarMusica(id, mockMusica);
  
      expect(Musica.findByPk).toHaveBeenCalledTimes(1);
      expect(musica.update).toHaveBeenCalledTimes(1);
      expect(musica.update).toHaveBeenCalledWith(mockMusica);
    });
  }); 