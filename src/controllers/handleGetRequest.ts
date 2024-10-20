import { ServerResponse } from 'http';
import { BASE_URL } from '..';
import { getUser, getUsers } from '../services/userService';
import isValidUUID from '../utils/isValidUUID';

const handleGetRequest = (res: ServerResponse, reqUrl: string) => {
  const idParams = reqUrl.substring(BASE_URL.length + 1);
  const users = getUsers();
  const user = getUser(idParams);
  console.log(idParams);

  if (!idParams) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  if (!isValidUUID(idParams)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid user id' }));
    return;
  }

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: `User with id ${idParams} doesn't exist` })
    );
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ user }));
  return;
};
export default handleGetRequest;
