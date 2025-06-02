const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
