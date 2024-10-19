import { IncomingMessage, ServerResponse } from 'http';
import isValidUserData from '../utils/isValidUserData';
import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../services/userService';

const handlePostRequest = (req: IncomingMessage, res: ServerResponse) => {
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

        const userId = uuidv4();
        const user = {
          ...requestBody,
          id: userId,
        };

        addUser(user);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.statusCode = 201;
        res.end(JSON.stringify(user));
        return;
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user data' }));
        return;
      }
    });
};

export default handlePostRequest;
