import { User } from '../types/types';

let users: User[] = [];

export const getUsers = (): User[] => {
  return users;
};

export const getUser = (id: string): User | null => {
  let userToFind: User | null = null;

  users.forEach((user) => {
    if (user.id === id) {
      userToFind = user;
    }
  });

  return userToFind;
};

export const addUser = (user: User): void => {
  users.push(user);
};

export const updateUser = (updatedUser: User): void => {
  const filteredUsers = users.filter((user) => user.id !== updatedUser.id);
  filteredUsers.push(updatedUser);
  users = [...filteredUsers];
};
