declare namespace NodeJS {
    interface ProcessEnv {
        APP_URL: string;
        PORT: string;
        SECRET_KEY: string;
        JWT_EXPIRATION: string;
    }
}