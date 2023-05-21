import { hash } from 'bcrypt';
import { Usuario, UserInterface } from '../models/Usuario';
import { Attributes } from 'sequelize/types';
import { userRoles } from '../constants/userRoles';
import { QueryError } from '../../../../errors/QueryError';
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { PermissionError } from '../../../../errors/PermissionError';
import { PayloadParams } from '../types/PayloadParam';

export class UsuarioServiceClasse{
    async encryptPassword(password:string) {
        const saltRounds = 10;
        const encryptPassword = await hash(password, saltRounds);
        return encryptPassword;
    }

    /**@brief Adiciona novo usuario no banco.*/
    async adicionarUsuario(body: Attributes<UserInterface>) {
        if (body.cargo == userRoles.admin) {
            throw new PermissionError('Não é possível criar um usuário com cargo de administrador!');
        }

        const user = await Usuario.findOne({where: {email: body.email}});

        if(user){
            throw new QueryError('E-mail já cadastrado');
        }

        const newUser = {
            nome: body.nome, 
            email: body.email, 
            senha: body.senha,
            cargo: body.cargo, 
        };
        newUser.senha = await this.encryptPassword(body.senha);
        
        await Usuario.create(newUser);
    }

    /**@brief Atualiza um usuario.*/
    async update(id: string, body: UserInterface, loggedUser: PayloadParams){
        if (loggedUser.cargo != userRoles.admin && loggedUser.id != id){
            throw new NotAuthorizedError('Você não tem permissão para editar outro usuário');
        }
        if (body.cargo && loggedUser.cargo != userRoles.admin && loggedUser.cargo != body.cargo){
            throw new NotAuthorizedError('Você não tem permissão para editar seu cargo');
        }

        const user = await this.obterUsuarioPorId(id);

        if (body.senha){
            body.senha = await this.encryptPassword(body.senha);
        }

        await user.update(body);
    }

    /**@brief Busca no banco todos os usuarios cadastrados.*/
    async obterUsuarios(){
        const usuarios = await Usuario.findAll();

        if(!usuarios) throw new QueryError('Nenhum usuario disponivel');

        return usuarios;
    }

    async obterUsuarioPorId(id: string){
        const usuario = await Usuario.findByPk(id);

        if (!usuario){
            throw new QueryError('ID nao encontrado.');
        }

        return usuario;
    }
    
    /**@brief Deleta um usuario.*/
    async delete(id: string, idReqUser: string) {
        if (idReqUser == id)
            throw new PermissionError('Não é possível deletar o próprio usuário.');

        const user = await this.obterUsuarioPorId(id);
        await user.destroy();
    }

    async deletarUsuarioPorId(id: string){
        const usuario = await Usuario.findByPk(id);

        if (!usuario){
            throw new QueryError('Musica nao encontrada.');
        }

        usuario.destroy();
    }
}

export const UsuarioService = new UsuarioServiceClasse();