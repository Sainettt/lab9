const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();

router.get('/', authorController.getAllAuthors);
router.put('/:id', authorController.editAuthor);

module.exports = router;