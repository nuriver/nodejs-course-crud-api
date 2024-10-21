export interface User {
  id?: string;
  userName: string;
  age: number;
  hobbies: string[];
}

export type UserCheck = {
  [key: string]: 'string' | 'number' | 'array';
};
