// const http = require('http');
// const hostname = 'localhost';
// const port = 3000;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World ');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at   http://${hostname}:${port}/`);
// });

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = 10000;

// body-parser is a nodejs body-parsing middleware
//  
app.use(bodyParser.json());

// arrays storing books
let books = [
  {
    name: 'The power of passion and preserverance',
    author: 'Angela Duckworth'
},
{
    name: 'Choose Yourself',
    author: 'James Altucher'
},
{
    name: 'Think and Grow Rich ',
    author: 'Napoleon Hill'
},
{
    name: 'Illuminate' ,
    author: 'Nancy Duarte & Patti Sanchez'
},
]

// This is a route to create a new book
app.post('/api/books', (req, res) => {
  const {name, author} = req.body;
  if (!name || !author) {
    return res.status(400).json({error: 'name and author are required'})
  }

  const newBook = { id: books.length + 1, name, author };
  books.push(newBook);

  return res.status(201).json(newBook);
});









app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});