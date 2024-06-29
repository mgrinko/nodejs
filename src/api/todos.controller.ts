import { RequestHandler } from 'express';
import { todosService } from '../services/todos.service.js';

export const getAll: RequestHandler = async (req, res) => {
  const todos = await todosService.getAll();

  res.json(todos);
};

export const create: RequestHandler = async (req, res) => {
  const title = req.body.title as string;

  if (!title) return res.sendStatus(400);

  const todo = await todosService.create(title);

  res.status(201).json(todo);
};

export const deleteOne: RequestHandler = async (req, res) => {
  await todosService.deleteById(req.params.id);

  res.sendStatus(204);
};

export const update: RequestHandler = async (req, res) => {
  const { title, completed } = req.body;
  const todo = await todosService.getById(req.params.id);

  if (!todo) return res.sendStatus(404);

  const updatedTodo = await todosService.update({
    id: req.params.id,
    title,
    completed,
  });

  res.json(updatedTodo);
};

export const deleteMany: RequestHandler = async (req, res) => {
  const ids = req.body;

  if (!Array.isArray(ids)) return res.sendStatus(400);

  await todosService.deleteMany(req.body);

  res.sendStatus(204);
};

export const updateMany: RequestHandler = async (req, res) => {
  const todos = req.body;

  if (!Array.isArray(todos)) return res.sendStatus(400);

  const updatedTodos = await todosService.updateMany(todos);

  res.json(updatedTodos);
};

export const todosController = {
  getAll,
  create,
  deleteOne,
  update,
  deleteMany,
  updateMany,
};
