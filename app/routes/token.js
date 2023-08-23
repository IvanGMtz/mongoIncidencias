import express from 'express';
import { crearToken } from '../middlewares/JWT.js';

const app = express();

app.get('/', crearToken);
export default app;