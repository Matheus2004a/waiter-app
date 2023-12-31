import path from 'node:path';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import * as dotenv from 'dotenv';

import { router } from './router';
import { cors } from './app/middlewares/cors';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const uri = process.env.DATABASE_URL;

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect(uri)
  .then(() => {
    const port = process.env.PORT;

    app.use(cors);
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
  })
  .catch((error) => console.log('Error connection MongoDB', error));
