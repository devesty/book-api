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
app.post('/api/postbooks', (req, res) => {
  const {name, author} = req.body;
  if (!name || !author) {
    return res.status(400).json({error: 'name and author are required'})
  }

  const newBook = { id: books.length + 1, name, author };
  books.push(newBook);

  return res.status(201).json(newBook);
});


// This is a route for getting all books
app.get('/api/getbooks', (req, res) => {
  debugger
  console.log(req);
  return res.json(books);
});


// This is a route for deleting a particular book
//{id} is a parameter representing the unique ID of the book to be deleted.
app.delete('/api/books/:id', (req, res) => {

 const { id } = req.params;

// This line uses the findIndex() method to search for the index of the book with the specific id in the books array
// The parseInt(id) is used to convert the id from the request parameters to an integer
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));
  if (bookIndex === -1) {
    return res.status(404).json({error: 'Book not found'});
  }

  // This line uses the splice() method to remove one book from the books array.
  // the [0] is used to extract the first and only element from the array which is the deleted book
  const deletedBook = books.splice(bookIndex, 1)[0]

return res.json(deletedBook)
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});