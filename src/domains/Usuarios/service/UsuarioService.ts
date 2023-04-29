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
        return await Usuario.findAll();
    }
    
    /**@brief Adiciona novo usuario no banco.*/
    async adicionarUsuario(body){
        await Usuario.create(body);
    }

    /**@brief Atualiza nome de  um usuario.*/
    async editarNome(nome, novoNome){
        const usuario = await Usuario.findOne({ where: { nome: `${nome}`} });

        if (!usuario){
            throw new Error('Usuario nao encontrado.');
        }

        usuario.quantidadeDownloads = novoNome;
        await usuario.save();
    }
    
    /**@brief Deleta um usuario.*/
    async deletarUsuario(id){
        const usuario = await Usuario.findOne({ where: { id: `${id}`} });

        if (!usuario){
            throw new Error('Usuario nao encontrado.');
        }

        Usuario.destroy({ where: { id: `${id}` } });
    }
}

module.exports = new UsuarioService();