import http from 'http';
import hasBaseUrl from './utils/hasBaseUrl';
import requestHandlers from './controllers';

// TODO: delete in config false for unused locals and args

export const BASE_URL = '/api/users';
export const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

const server = http.createServer((req, res) => {
  const method = req.method as string;
  const reqUrl = req.url;

  if (!METHODS.includes(method)) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 405;
    res.end(JSON.stringify({ message: `Method ${method} not allowed` }));
  }

  if (!hasBaseUrl(reqUrl)) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Resource not found' }));
  }

  if (reqUrl) {
    requestHandlers(req, res, method, reqUrl);
  }

  res.end();
});

server.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
