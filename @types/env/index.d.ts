declare namespace NodeJS {
    interface ProcessEnv {
        APP_URL: string;
        PORT: string;
        DB_HOST: string;
        DB_PORT: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_NAME: string;
        SECRET_KEY: string;
        JWT_EXPIRATION: string;
    }
}