import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);

  const navigate = useNavigate();

  const fetchAuthors = async () => {
    try {
      const response = await api.get('/authors');
      setAuthors(response.data);
      setAuthorId(response.data[0]?.id || '');
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && year && authorId) {
      try {
        await api.post('/books/add-book', { title, year, authorId });
        navigate('/books');
      } catch (error) {
        console.error('Error adding book:', error);
      }
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
          />
        </div>
        <div>
          <label>Author:</label>
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          >
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.firstName} {a.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBook;
