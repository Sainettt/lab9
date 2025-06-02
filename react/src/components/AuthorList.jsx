import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({
    firstName: '',
    lastName: ''
  });

  const fetchAuthors = async () => {
    try {
      const response = await api.get('/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const createAuthor = async () => {
    const { firstName, lastName } = newAuthor;
    if (!firstName.trim() || !lastName.trim()) {
      alert('Please enter both first name and last name!');
      return;
    }
    try {
      // POST-запрос на создание нового автора
      await api.post('/authors', { firstName, lastName });
      setNewAuthor({ firstName: '', lastName: '' }); // очищаем поля
      fetchAuthors(); // обновляем список
    } catch (error) {
      console.error('Error creating author:', error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            {author.firstName} {author.lastName}
            <Link to={`/authors/edit-author/${author.id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>

      <h3>Add New Author</h3>
      <input
        value={newAuthor.firstName}
        onChange={(e) =>
          setNewAuthor({ ...newAuthor, firstName: e.target.value })
        }
        placeholder="First name"
      />
      <input
        value={newAuthor.lastName}
        onChange={(e) =>
          setNewAuthor({ ...newAuthor, lastName: e.target.value })
        }
        placeholder="Last name"
      />
      <button onClick={createAuthor}>Create Author</button>
    </div>
  );
};

export default AuthorsList;
