import { Sequelize } from 'sequelize';

export function getEnv(name: string): string {
    const value = process.env[name];

    if(!value) {
        throw new Error(`Faltando: process.env['${name}']`);
    }

    return value;
};

export const sequelize = new Sequelize( {
    dialect: 'sqlite',
    storage: './database.sqlite'
});