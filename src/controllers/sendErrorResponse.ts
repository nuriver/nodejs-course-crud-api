import { ServerResponse } from 'http';

const sendErrorResponse = (
  res: ServerResponse,
  statusCode: number,
  method?: string
) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;

  if (statusCode === 404) {
    res.end(JSON.stringify({ message: 'Resource not found' }));
  }

  if (statusCode === 405) {
    res.end(JSON.stringify({ message: `Method ${method} not allowed` }));
  }
};

export default sendErrorResponse;
