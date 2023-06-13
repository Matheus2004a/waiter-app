import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

const uri = 'mongodb+srv://matheusaurelio2004:Mt7ImabFp4yy1OQA@cluster-mongo-waiterapp.b5g6ev2.mongodb.net';

mongoose.connect(uri)
  .then(() => {
    const app = express();
    const port = 3001;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
  })
  .catch((error) => console.log('Error connection MongoDB', error));
