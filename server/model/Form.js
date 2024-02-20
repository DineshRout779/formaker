const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled form',
  },
  description: {
    type: String,
  },
  fields: [
    {
      label: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  ],
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
