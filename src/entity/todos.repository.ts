import { db } from '../utils/db.js';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export async function getAll() {
  const { rows } = await db.query<Todo>('SELECT * FROM todos');

  return rows;
}

export async function getById(id: string) {
  const sql = `SELECT * FROM todos WHERE id = $1`;
  const { rows } = await db.query<Todo>(sql, [id]);

  return rows[0];
}

export async function create(title: string) {
  const sql =
    'INSERT INTO todos (title, completed) VALUES ($1, false) RETURNING *';
  const { rows } = await db.query<Todo>(sql, [title]);

  return rows[0];
}

export async function deleteById(id: string) {
  await db.query('DELETE FROM todos WHERE id = $1', [id]);
}

export async function update({ id, title, completed }: Todo) {
  const sql =
    'UPDATE todos SET title = $2, completed = $3 WHERE id = $1 RETURNING *';
  const { rows } = await db.query<Todo>(sql, [id, title, completed]);

  return rows[0];
}

export async function deleteMany(ids: string[]) {
  const sql = `DELETE FROM todos WHERE id = ANY($1)`;
  await db.query(sql, [ids]);
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
