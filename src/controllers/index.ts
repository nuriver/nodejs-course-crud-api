import { IncomingMessage, ServerResponse } from 'http';
import handleGetRequest from './handleGetRequest';
import handlePostRequest from './handlePostRequest';
import handlePutRequest from './handlePutRequest';
import handleDeleteRequest from './handleDeleteRequest';

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

  if (method === 'PUT') {
    handlePutRequest(req, res, reqUrl);
    return;
  }

  if (method === 'DELETE') {
    handleDeleteRequest(res, reqUrl);
    return;
  }

  res.writeHead(405, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: `Method ${method} not allowed` }));
  return;
};

export default requestHandlers;
