const express = require('express');
const authorController = require('../controllers/authorControllers');
const router = express.Router();

router.get('/', authorController.getAllAuthors);
router.put('/:id', authorController.editAuthor);

module.exports = router;