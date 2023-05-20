const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const User = require('../models/Usuario');
const userRoles = require('../constants/userRoles.js');
const QueryError = require('../../../../errors/QueryError');
const PermissionError = require('../../../../errors/PermissionError');
const NotAuthorizedError = require('../../../../errors/NotAuthorizedError');

class UsuarioService{
    async encryptPassword(password) {
        const saltRounds = 10;
        const encryptPassword = await bcrypt.hash(password, saltRounds);
        return encryptPassword;
    }

    /**@brief Adiciona novo usuario no banco.*/
    async create(body) {
        if (body.role == userRoles.admin) {
            throw new PermissionError('Não é possível criar um usuário com cargo de administrador!');
        }
        const user = await User.findOne({where: {email: body.email}});
        if(user){
            throw new QueryError('E-mail já cadastrado');
    
        } else{
            const user = {
                name: body.name, 
                email: body.email, 
                password: body.password,
                role: body.role, 
            };
            user.password = await this.encryptPassword(body.password);
           
            await User.create(user);
        }
    }

    /**@brief Atualiza um usuario.*/
    async update(id,body, loggedUser){
        const user = await this.getById(id);
        if (loggedUser.role != user.Roles.admin && loggedUser.id != id){
            throw new NotAuthorizedError('Você não tem permissão para editar outro usuário');
        }
        if (loggedUser.role && loggedUser.role != userRoles.admin){
            throw new NotAuthorizedError('Você não tem permissão para editar seu cargo');
        }
        if (body.password){
            body.password = await this.encryptPassword(body.password);
        }

        await user.update(body);
    }

    /**@brief Busca no banco todos os usuarios cadastrados.*/
    async obterUsuarios(){
        const usuarios = await Usuario.findAll();

        if(!usuarios) throw new QueryError('Nenhum usuario disponivel');

        return usuarios;
    }

    async obterUsuarioPorId(id){
        const usuario = await Usuario.findByPk(id);

        if (!usuario){
            throw new QueryError('Musica nao encontrada.');
        }

        return usuario;
    }
    
    /**@brief Deleta um usuario.*/
    async delete(id, idReqUser) {
        if (idReqUser == id)
            throw new PermissionError('Não é possível deletar o próprio usuário.');

        const user = await this.getById(id);
        await user.destroy();
    }

    async deletarUsuarioPorId(id){
        const usuario = await Usuario.findByPk(id);

        if (!usuario){
            throw new QueryError('Musica nao encontrada.');
        }

        usuario.destroy();
    }
}

module.exports = new UsuarioService();