import { IncomingMessage, ServerResponse } from 'http';
import { BASE_URL } from '..';

const requestHandlers = (
  req: IncomingMessage,
  res: ServerResponse,
  method: string,
  reqUrl: string
) => {
  const userId = reqUrl.substring(BASE_URL.length + 1);

  if (method === 'GET' && userId) {
  }
};

export default requestHandlers;
