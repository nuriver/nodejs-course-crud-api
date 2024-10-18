import { ServerResponse } from 'http';
import { BASE_URL } from '..';
import { getUser, getUsers } from '../services/userService';
import isValidUUID from '../utils/isValidUUID';

const handleGetRequest = (res: ServerResponse, reqUrl: string) => {
  const idParams = reqUrl.substring(BASE_URL.length + 1);
  const users = getUsers();
  const user = getUser(idParams);

  res.setHeader('Content-Type', 'application/json');

  if (!idParams) {
    res.statusCode = 200;
    res.end(JSON.stringify(users));
    return;
  }

  if (!isValidUUID(idParams)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'Invalid user id' }));
    return;
  }

  if (!user) {
    res.statusCode = 404;
    res.end(
      JSON.stringify({ message: `User with id ${idParams} doesn't exist` })
    );
    return;
  }

  res.statusCode = 200;
  res.end(JSON.stringify({ user }));
  return;
};
export default handleGetRequest;
