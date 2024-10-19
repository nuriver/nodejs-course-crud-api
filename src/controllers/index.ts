import { IncomingMessage, ServerResponse } from 'http';
import handleGetRequest from './handleGetRequest';
import handlePostRequest from './handlePostRequest';

const requestHandlers = (
  req: IncomingMessage,
  res: ServerResponse,
  method: string,
  reqUrl: string
) => {
  if (method === 'GET') {
    handleGetRequest(res, reqUrl);
    return;
  }

  if (method === 'POST') {
    handlePostRequest(req, res);
    return;
  }
};

export default requestHandlers;
