import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  username: string;
  password: string;
}

const users: IUser[] = [
  {
    username: 'pokelover',
    password: 'a',
  },
];

let sessions = [];

export const getUserByUsername = async (username: string): Promise<null | IUser> => {
  const existingUser = users.find((user) => user.username === username);
  if (!existingUser) return Promise.resolve(null);
  return Promise.resolve(existingUser);
};

export const registerUser = (user: { username: string; password: string; }) => {
  const existingUser = users.find((u) => u.username === user.username);
  if (existingUser) return Promise.reject(new Error('User already exists'));
  users.push(user);
  return Promise.resolve(user);
};

export const createSession = (username: string) => {
  const session = {
    id: uuidv4(),
    username,
  };
  sessions.push(session);
  return Promise.resolve(session);
};

export const getSession = (id: string) => {
  const session = sessions.find((session) => session.id === id);
  if (!session) return Promise.resolve(null);
  return Promise.resolve(session);
};

export const removeSession = (id: string) => {
  const session = sessions.find((session) => session.id === id);
  if (!session) return Promise.reject(new Error('Session not found'));
  sessions = sessions.filter((session) => session.id !== id);
  return Promise.resolve(session);
};
