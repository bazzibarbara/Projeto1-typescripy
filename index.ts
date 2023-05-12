import express, { Application } from 'express';
import { Server } from 'http';

const app: Application = express();
const port: number = Number(process.env.PORT);

const server: Server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
