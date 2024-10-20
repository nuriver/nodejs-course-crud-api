import { IncomingMessage, ServerResponse } from 'http';
import isValidUUID from '../utils/isValidUUID';
import { getUser, updateUser } from '../services/userService';
import { BASE_URL } from '..';
import isValidUserData from '../utils/isValidUserData';
import { User } from '../types/types';

const handlePutRequest = (
  req: IncomingMessage,
  res: ServerResponse,
  reqUrl: string
) => {
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

  const user: User | null = getUser(idParams);

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: `User with id ${idParams} doesn't exist` })
    );
    return;
  }

  const bodyStream: Uint8Array[] = [];
  req
    .on('data', (chunk) => {
      bodyStream.push(chunk);
    })
    .on('end', () => {
      const bufferData = Buffer.concat(bodyStream).toString();
      try {
        const requestBody = JSON.parse(bufferData);

        if (!isValidUserData(bufferData)) {
          throw new Error('Not valid user data');
        }
        try {
          const updatedUser = {
            ...requestBody,
            id: user.id,
          };
          updateUser(updatedUser);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedUser));
          return;
        } catch {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              message: 'Internal Server Error. Please try again later.',
            })
          );
        }
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user data' }));
        return;
      }
    });
};

export default handlePutRequest;
