const Author = require('../models/Author')
const { STATUS_CODES } = require('../constants/statusCode')

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.getAll()
    res.status(STATUS_CODES.OK).json(authors)
  } catch (error) {
    console.error('Error fetching authors:', error)
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to fetch authors' })
  }
}
exports.editAuthor = async (req, res) => {
  try {
    const authorId = req.params.id
    const { firstName, lastName } = req.body
    const updatedAuthor = await Author.update(authorId, { firstName, lastName })
    if (!updatedAuthor) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: 'Author not found' })
    }
    res.status(STATUS_CODES.OK).json(updatedAuthor)
  } catch (error) {
    console.error('Error updating author:', error)
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to update author' })
  }
}
exports.createAuthor = async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    if (!firstName || !lastName) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ error: 'First name and last name are required' })
    }
    const newAuthor = await Author.create({ firstName, lastName })
    res.status(STATUS_CODES.CREATED).json(newAuthor)
  } catch (error) {
    console.error('Error creating author:', error)
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to create author' })
  }
}
