import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BooksList from './components/BookList';
import AuthorsList from './components/AuthorList';
import AddBook from './components/AddBook';
import EditAuthor from './components/EditAuthor';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/books">Books</Link> | <Link to="/authors">Authors</Link>
      </nav>

      <Routes>
        <Route path="/books" element={<BooksList />} />
        <Route path="/books/add-book" element={<AddBook />} />
        <Route path="/authors" element={<AuthorsList />} />
        <Route path="/authors/edit-author/:id" element={<EditAuthor />} />
      </Routes>
    </div>
  );
};

export default App;
