/* eslint-disable @typescript-eslint/no-explicit-any */
import { Usuario } from '../../Usuarios/models/Usuario';
import { Musica } from '../../Musicas/models/Musica';
import { UsuarioMusica } from '../models/UsuarioMusica';
import { UsuarioMusicaService } from './UsuarioMusicaService';

jest.mock('../models/UsuarioMusica', () => ({
    UsuarioMusica: {
        create: jest.fn(),
        findAll: jest.fn(),
        destroy: jest.fn()
    },
}));

jest.mock("../../Musicas/models/Musica", () => ({
    Musica: {
        findByPk: jest.fn(),
        findAll: jest.fn(),
    },
}));

jest.mock("../../Usuarios/models/Usuario", () => ({
    Usuario: {
        findByPk: jest.fn(),
        findAll: jest.fn(),
    },
}));

describe('criar', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('o método recebe o id de um usuário e o id de uma musica ==> cria a relação com os dados certos',
    async () => {
        const idUsuario = '1';
        const idMusica = '1';
    
        (Usuario.findByPk as any).mockResolvedValue({});
        (Musica.findByPk as any).mockResolvedValue({});
        (UsuarioMusica.create as jest.MockedFunction<typeof UsuarioMusica.create>).mockResolvedValue({});

        await UsuarioMusicaService.adicionarUsuarioMusica(idUsuario, idMusica);

        expect(UsuarioMusica.create).toHaveBeenCalledTimes(1);
    });
});

describe('obterMusicasDeUsuario', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('o método recebe o id de um usuário ==> retorna todas as musicas com o findAll',
    async () => {
        const idUsuario = '1';

        const mockUsuarioMusica = [
            {
                id: '1',
                titulo: 'musica1',
                foto: 'foto1.jpg',
                id_artista: '2',
                categoria: 'Rap',
                Usuarios: [
                    {
                        id: '1',
                    }
                ]
            }
        ];
    
        (Musica.findAll as any).mockResolvedValue(mockUsuarioMusica);

        const usuarioMusicas = await UsuarioMusicaService.obterMusicasPorUsuario(idUsuario);

        expect(Musica.findAll).toHaveBeenCalledTimes(1);
        expect(usuarioMusicas).toEqual(mockUsuarioMusica);
    })
});

describe('obterUsuariosDeMusica', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('o método recebe o id de uma musica ==> retorna todos usuarios com o findAll',
    async () => {
        const idMusica = '1';

        const mockMusicaUsuario = [
            {
                id: '1',
                nome: 'joao',
                email: 'joao@gmail.com',
                cargo: 'admin',
                categoria: 'Rap',
                Usuarios: [
                    {
                        id: '1',
                    }
                ]
            }
        ];
    
        (Usuario.findAll as any).mockResolvedValue(mockMusicaUsuario);

        const musicaUsuarios = await UsuarioMusicaService.obterUsuariosPorMusica(idMusica);

        expect(Usuario.findAll).toHaveBeenCalledTimes(1);
        expect(musicaUsuarios).toEqual(mockMusicaUsuario);
    })
});

describe('deletar', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('o método recebe o id de um usuário e o id de uma musica ==> destroi a relacao com os dados certos',
    async () => {
        const idUsuario = '1';
        const idMusica = '1';
    
        (Usuario.findByPk as any).mockResolvedValue({id: idUsuario});
        (Musica.findByPk as any).mockResolvedValue({id: idMusica});
        (UsuarioMusica.destroy as any).mockResolvedValue({});

        await UsuarioMusicaService.deletarUsuarioMusica(idUsuario, idMusica);

        expect(Musica.findByPk).toHaveBeenCalledTimes(1);
        expect(Usuario.findByPk).toHaveBeenCalledTimes(1);
        expect(UsuarioMusica.destroy).toHaveBeenCalledTimes(1);
        expect(UsuarioMusica.destroy).toHaveBeenCalledWith({where: {idUsuario, idMusica}});
    })
});