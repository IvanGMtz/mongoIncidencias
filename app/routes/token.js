import express from 'express';
import { crearToken } from '../middlewares/JWT.js';

const app = express();

app.get('/:usuario', crearToken);
export default app;