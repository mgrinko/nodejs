import { RequestHandler } from 'express';
import { todosRepository } from '../entity/todos.repository.js';

export const getAll: RequestHandler = async (req, res) => {
  const todos = await todosRepository.getAll();
  res.json(todos);
};

export const create: RequestHandler = async (req, res) => {
  const title = req.body.title as string;

  if (!title) return res.sendStatus(400);

  const todo = await todosRepository.create(title);
  res.status(201).json(todo);
};

export const deleteOne: RequestHandler = async (req, res) => {
  await todosRepository.deleteById(req.params.id);

  res.sendStatus(204);
};

export const update: RequestHandler = async (req, res) => {
  const { title, completed } = req.body;
  const todo = await todosRepository.getById(req.params.id);

  if (!todo) return res.sendStatus(404);

  const updatedTodo = await todosRepository.update({
    id: req.params.id,
    title,
    completed,
  });

  res.json(updatedTodo);
};

export const deleteMany: RequestHandler = async (req, res) => {
  const ids = req.body;

  if (!Array.isArray(ids)) return res.sendStatus(400);

  await todosRepository.deleteMany(req.body);

  res.sendStatus(204);
};

export const updateMany: RequestHandler = async (req, res) => {
  const todos = req.body;

  if (!Array.isArray(todos)) return res.sendStatus(400);

  const updatedTodos = await todosRepository.updateMany(todos);

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
