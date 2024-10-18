import { IncomingMessage, ServerResponse } from 'http';
import { BASE_URL } from '..';
import handleGetRequest from './handleGetRequest';

const requestHandlers = (
  req: IncomingMessage,
  res: ServerResponse,
  method: string,
  reqUrl: string
) => {
  if (method === 'GET') {
    handleGetRequest(res, reqUrl);
  }
};

export default requestHandlers;
