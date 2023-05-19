import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.ts';
import { userRoles } from '../constants/userRoles.ts';
import QueryError from '../../../../errors/QueryError.ts';
import PermissionError from '../../../../errors/PermissionError.ts';
import NotAuthorizedError from '../../../../errors/NotAuthorizedError.ts';

class UsuarioService {
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const encryptPassword = await bcrypt.hash(password, saltRounds);
    return encryptPassword;
  }

  async create(body: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<void> {
    if (body.role === userRoles.admin) {
      throw new PermissionError('Não é possível criar um usuário com cargo de administrador!');
    }
    const user = await Usuario.findOne({ where: { email: body.email } });
    if (user) {
      throw new QueryError('E-mail já cadastrado');
    } else {
      const user = {
        nome: body.name,
        email: body.email,
        senha: body.password,
        cargo: body.role,
      };
      user.senha = await this.encryptPassword(body.password);

      await Usuario.create(user);
    }
  }

  async update(id: number, body: any, loggedUser: any): Promise<void> {
    const user = await this.getById(id);
    if (loggedUser.role !== user.Roles.admin && loggedUser.id !== id) {
      throw new NotAuthorizedError('Você não tem permissão para editar outro usuário');
    }
    if (loggedUser.role && loggedUser.role !== userRoles.admin) {
      throw new NotAuthorizedError('Você não tem permissão para editar seu cargo');
    }
    if (body.password) {
      body.password = await this.encryptPassword(body.password);
    }

    await user.update(body);
  }

  /**@brief Busca no banco todos os usuários cadastrados.*/
  async obterUsuarios(): Promise<Usuario[]> {
    return await Usuario.findAll();
  }

  /**@brief Adiciona novo usuário no banco.*/
  async adicionarUsuario(body: any): Promise<void> {
    await Usuario.create(body);
  }

  /**@brief Atualiza nome de um usuário.*/
  async editarNome(nome: string, novoNome: string): Promise<void> {
    const usuario = await Usuario.findOne({ where: { nome } });

    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    usuario.nome = novoNome;
    await usuario.save();
  }

  /**@brief Deleta um usuário.*/
  async deletarUsuario(id: number): Promise<void> {
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    await Usuario.destroy({ where: { id } });
  }
}

export default new UsuarioService();
