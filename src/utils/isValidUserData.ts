import { UserCheck } from '../types/types';

const isValidUserData = (rawUserData: string): boolean => {
  const userData = JSON.parse(rawUserData);

  const requiredFields: UserCheck = {
    userName: 'string',
    age: 'number',
    hobbies: 'array',
  };

  for (const key in requiredFields) {
    if (!userData.hasOwnProperty(key)) {
      return false;
    }

    const expectedType = requiredFields[key];
    const actualType = Array.isArray(userData[key])
      ? 'array'
      : typeof userData[key];

    if (expectedType !== actualType) {
      return false;
    }

    if (expectedType === 'array') {
      if (!userData[key].every((item: unknown) => typeof item === 'string')) {
        return false;
      }
    }
  }
  return true;
};

export default isValidUserData;
