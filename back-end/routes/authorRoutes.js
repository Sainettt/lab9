const express = require('express');
const authorController = require('../controllers/authorControllers');
const router = express.Router();

router.get('/', authorController.getAllAuthors);
router.put('/edit-author/:id', authorController.editAuthor);
router.post('/', authorController.createAuthor);

module.exports = router;