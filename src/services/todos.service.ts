import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [];

export function getAll() {
  return todos;
}

export function getById(id: string) {
  return todos.find(todo => todo.id === id);
}

export function create(title: string) {
  const todo = { id: uuidv4(), title, completed: false };

  todos.push(todo);

  return todo;
}

export function deleteById(id: string) {
  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) return;

  const [todo] = todos.splice(index, 1);

  return todo;
}

export function update({ id, title, completed }: Todo) {
  const todo = todos.find(todo => todo.id === id);

  if (!todo) return;

  return Object.assign(todo, { title, completed });
}

export function deleteMany(ids: string[]) {
  return ids.map(deleteById);
}

export function updateMany(todos: Todo[]) {
  return todos.map(update);
}

export const todosService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  deleteMany,
  updateMany,
};
