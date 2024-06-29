import { Router, Request, Response, NextFunction } from 'express';
import { todosController } from './todos.controller.js';

export const todosRouter = Router();

todosRouter.get('/', todosController.getAll);
todosRouter.post('/', todosController.create);
todosRouter.delete('/:id', todosController.deleteOne);
todosRouter.put('/:id', todosController.update);
todosRouter.patch('/', isAction('delete'), todosController.deleteMany);
todosRouter.patch('/', isAction('update'), todosController.updateMany);

function isAction(action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.query.action === action) {
      next();
    } else {
      next('route');
    }
  };
}
