const router = require('express').Router();
const { getForm, createForm } = require('../controller/form');

// Create a new form
router.post('/', createForm);

// get the form with id
router.get('/:id', getForm);

// update form
router.put('/:id', getForm);

module.exports = router;
