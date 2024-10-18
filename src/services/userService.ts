import { User } from '../types/types';

const users: User[] = [];

export const getUsers = () => {
  return users;
};

export const getUser = (id: string) => {
  users.forEach((user) => {
    if (user.id === id) {
      return user;
    }
  });

  return null;
};
