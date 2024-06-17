import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = Number(process.env.PORT || 3000);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
