const express = require('express');
const bookController = require('../controllers/bookControllers');
const router = express.Router();

router.get('/', bookController.getAllBooks);
router.post('/add-book', bookController.createBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
