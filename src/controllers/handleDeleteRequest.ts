import { ServerResponse } from 'http';
import { BASE_URL } from '..';
import isValidUUID from '../utils/isValidUUID';
import { User } from '../types/types';
import { deleteUser, getUser } from '../services/userService';

const handleDeleteRequest = (res: ServerResponse, reqUrl: string) => {
  const idParams = reqUrl.substring(BASE_URL.length + 1);

  if (!idParams) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Missing user id in the request URL',
      })
    );
    return;
  }

  if (!isValidUUID(idParams)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid user id' }));
    return;
  }

  try {
    const user: User | null = getUser(idParams);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ message: `User with id ${idParams} doesn't exist` })
      );
      return;
    }

    deleteUser(user);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
    return;
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Internal Server Error. Please try again later.',
      })
    );
  }
};

export default handleDeleteRequest;
