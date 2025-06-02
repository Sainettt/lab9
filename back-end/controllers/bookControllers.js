const Book = require('../models/Book')

const { STATUS_CODES } = require('../constants/statusCode')

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll()
    res.status(STATUS_CODES.OK).json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to fetch books' })
  }
}
exports.createBook = async (req, res) => {
  try {
    const { title, year, authorId } = req.body
    const newBook = await Book.create(title, year, authorId)
    res.status(STATUS_CODES.CREATED).json(newBook)
  } catch (error) {
    console.error('Error creating book:', error)
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to create book' })
  }
}
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id
    const result = await Book.delete(bookId)
    if (result.deletedCount === 0) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: 'Book not found' })
    }
    res.status(STATUS_CODES.NO_CONTENT).send()
  } catch (error) {
    console.error('Error deleting book:', error)
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to delete book' })
  }
}
