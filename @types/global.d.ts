interface PayloadParams {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface Env {
	DB: string;
	DB_USER: string;
	DB_PASSWORD: string;
	DB_HOST: string;
	SECRET_KEY: string;
	NODE_ENV: string;
	JWT_EXPIRATION: string;
	APP_URL: string;
} 

declare global {
    namespace Express {
        interface Request{
            user?: PayloadParams;  // user é opcional no objeto da requisição
								   //  antes da autenticação, por isso a ?.
        }
    };
    namespace NodeJS {
        interface ProcessEnv extends Env {};
			// Outra alternativa:
			// interface ProcessEnv {
		    //     DB: string;
		    //     DB_USER: string;
		    //     DB_PASSWORD: string;
		    //     DB_HOST: string;
		    //     SECRET_KEY: string;
		    //     NODE_ENV: string;
		    //     JWT_EXPIRATION: string;
		    //     APP_URL: string;
		    // }
    };
}