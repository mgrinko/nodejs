import express from 'express';
import cors from 'cors';
import { todosRouter } from './api/todos.router.js';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/todos', todosRouter);

  return app;
}
