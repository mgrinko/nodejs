import { Router } from 'express';
import { todosService } from '../services/todos.service.js';

export const todosRouter = Router();

todosRouter.get('/', async (req, res) => {
  const todos = await todosService.getAll();

  res.json(todos);
});

todosRouter.post('/', async (req, res) => {
  const title = req.body.title as string;

  if (!title) return res.sendStatus(400);

  const todo = await todosService.create(title);

  res.status(201).json(todo);
});

todosRouter.delete('/:id', async (req, res) => {
  await todosService.deleteById(req.params.id);

  res.sendStatus(204);
});

todosRouter.put('/:id', async (req, res) => {
  const { title, completed } = req.body;
  const todo = await todosService.getById(req.params.id);

  if (!todo) return res.sendStatus(404);

  const updatedTodo = await todosService.update({
    id: req.params.id,
    title,
    completed,
  });

  res.json(updatedTodo);
});
