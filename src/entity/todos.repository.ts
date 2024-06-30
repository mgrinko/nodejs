import { Todo } from '@prisma/client';
import { db } from '../utils/db.js';

export function getAll() {
  return db.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getById(id: string) {
  return db.todo.findUnique({ where: { id } });
}

export async function create(title: string) {
  return db.todo.create({
    data: { title },
  });
}

export async function deleteById(id: string) {
  return db.todo.delete({ where: { id } });
}

export async function update({ id, title, completed }: Todo) {
  return db.todo.update({
    where: { id },
    data: { title, completed },
  });
}

export async function deleteMany(ids: string[]) {
  return db.todo.deleteMany({
    where: {
      id: { in: ids },
    },
  });
}

export async function updateMany(todos: Todo[]) {
  for (const todo of todos) {
    await update(todo);
  }
}

export const todosRepository = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  deleteMany,
  updateMany,
};
