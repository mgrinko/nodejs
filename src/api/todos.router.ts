import { Router } from 'express';
import { todosController } from './todos.controller.js';

export const todosRouter = Router();

todosRouter.get('/', todosController.getAll);
todosRouter.post('/', todosController.create);
todosRouter.delete('/:id', todosController.deleteOne);
todosRouter.put('/:id', todosController.update);
