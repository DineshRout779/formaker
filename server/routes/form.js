const router = require('express').Router();
const {
  getForm,
  createForm,
  getForms,
  editForm,
  deleteForm,
} = require('../controller/form');

// Create a new form
router.post('/', createForm);

// get the form with id
router.get('/:id', getForm);

// get all forms
router.get('/', getForms);

// update form
router.put('/:id', editForm);

// delete form
router.delete('/:id', deleteForm);

module.exports = router;
