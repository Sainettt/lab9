import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const EditAuthor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({
    firstName: '',
    lastName: ''
  });

  const fetchAuthor = async () => {
    try {
      const response = await api.get('/authors');
      const foundAuthor = response.data.find((a) => a.id === parseInt(id));
      if (foundAuthor) {
        setAuthor({
          firstName: foundAuthor.firstName || '',
          lastName: foundAuthor.lastName || ''
        });
      } else {
        console.error('Author not found');
      }
    } catch (error) {
      console.error('Error fetching author:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = author;
    if (firstName.trim() && lastName.trim()) {
      try {
        await api.put(`/authors/edit-author/${id}`, { firstName, lastName });
        navigate('/authors');
      } catch (error) {
        console.error('Error updating author:', error);
      }
    } else {
      alert('Please fill in both first name and last name!');
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div>
      <h2>Edit Author</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            value={author.firstName}
            onChange={(e) =>
              setAuthor({ ...author, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            value={author.lastName}
            onChange={(e) =>
              setAuthor({ ...author, lastName: e.target.value })
            }
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditAuthor;
