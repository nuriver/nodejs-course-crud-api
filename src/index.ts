import http from 'http';
import hasBaseUrl from './utils/hasBaseUrl';
import requestHandlers from './controllers';
import 'dotenv/config';

// TODO: delete in config false for unused locals and args

export const BASE_URL = '/api/users';
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const method = req.method as string;
  const reqUrl = req.url;

  if (!hasBaseUrl(reqUrl)) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Resource not found' }));
    return;
  }

  if (reqUrl) {
    requestHandlers(req, res, method, reqUrl);
    return;
  }

  res.end();
});

server.listen(8000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
