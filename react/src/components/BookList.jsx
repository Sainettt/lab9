import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'

const BooksList = () => {
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const navigate = useNavigate()

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books')
      setBooks(response.data)
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }
  const fetchAuthors = async () => {
    try {
      const response = await api.get('/authors')
      setAuthors(response.data)
    } catch (error) {
      console.error('Error fetching authors:', error)
    }
  }

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`)
      fetchBooks() // обновляем список
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  useEffect(() => {
    fetchBooks()
    fetchAuthors()
  }, [])

  const getAuthorName = (authorId) => {
    const author = authors.find((a) => a.id === authorId)
    return author ? `${author.firstName} ${author.lastName}` : 'Unknown'
  }

  return (
    <div>
      <h2>Books</h2>
      <button onClick={() => navigate('/books/add-book')}>Add Book</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} ({book.year}) - {getAuthorName(book.authorId)}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BooksList
