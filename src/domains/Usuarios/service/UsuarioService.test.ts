import { Usuario } from '../models/Usuario';
import { UserInterface } from '../models/Usuario';
import { UsuarioService } from './UsuarioService';

jest.mock("../models/Usuario", () => ({
    Usuario: {
        findAll: jest.fn(),
    },
}));

describe('obterUsuarios', () => {
	beforeEach(() => {
		jest.resetAllMocks()
	});

	test('método é chamado => retorna todos os usuários', async () => {
		const usuarios = [
			{
				id: '1',
				nome: 'teste',
				email: 'teste@gmail.com',
				cargo: 'user',
			} as UserInterface,
			{
				id: '2',
				nome: 'teste2',
				email: 'teste@hotmail.com',
				cargo: 'admin',
			} as UserInterface,
		];
	
		(Usuario.findAll as jest.MockedFunction<typeof Usuario.findAll>).mockResolvedValue(usuarios);
	
		const retornoUsuarios = await UsuarioService.obterUsuarios();
	
		expect(retornoUsuarios).toEqual(usuarios);
		expect(Usuario.findAll).toHaveBeenCalledTimes(1);
	});
})