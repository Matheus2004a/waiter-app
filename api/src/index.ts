import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import { router } from './router';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const uri = process.env.DATABASE_URL;

mongoose.connect(uri)
  .then(() => {
    const app = express();
    const port = process.env.PORT;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
  })
  .catch((error) => console.log('Error connection MongoDB', error));
