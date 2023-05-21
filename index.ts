/* eslint-disable no-undef */
import { app } from './config/expressConfig';
import { getEnv } from '../Projeto1-typescripy/database/index'
const port = getEnv('PORT');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});