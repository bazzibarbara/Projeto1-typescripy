/* eslint-disable @typescript-eslint/no-explicit-any */
import { Artista } from '../models/Artista';
import { ArtistaService } from './ArtistaService';

jest.mock('../models/Artista', () => ({
    Artista: {
        findByPk: jest.fn(),
        destroy: jest.fn(),
    },
}));

jest.mock('../../Musicas/models/Musica', () => ({
    Musica: {
    },
}));

describe('deletar', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
  
    test('método recebe um id => chama o destroy com o id correto', async () => {
        const id = '1';
    
        const artista = {
            id: '1',
            name: 'bruno',
            nacionalidade: 'br',
            foto: 'foto1',
            destroy: jest.fn(),
        };
    
        (Artista.findByPk as any).mockResolvedValue(artista);
        (Artista.destroy as any).mockResolvedValue({});
    
        await ArtistaService.deletarArtista(id);
    
        expect(Artista.findByPk).toHaveBeenCalledWith(id);
        expect(artista.destroy).toHaveBeenCalledTimes(1);
    });
});