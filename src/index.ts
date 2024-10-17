import http from 'http';

http
  .createServer((_, res) => {
    res.write('Hello World!');
    res.end();
  })
  .listen(8000);
