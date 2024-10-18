import http from 'http';
import hasBaseUrl from './utils/hasBaseUrl';
import requestHandlers from './controllers/handleGetRequest';
import sendErrorResponse from './controllers/sendErrorResponse';

// TODO: delete in config false for unused locals and args

export const BASE_URL = '/api/users';
export const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

const server = http.createServer((req, res) => {
  const method = req.method as string;
  const reqUrl = req.url;

  if (!METHODS.includes(method)) {
    sendErrorResponse(res, 405, method);
  }

  if (!hasBaseUrl(reqUrl)) {
    sendErrorResponse(res, 404);
  }

  if (reqUrl) {
    requestHandlers(req, res, method, reqUrl);
  }

  res.end();
});

server.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
