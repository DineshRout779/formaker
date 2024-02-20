const Form = require('../model/Form');

const createForm = async (req, res) => {
  console.log(req.body);
  try {
    const form = new Form(req.body);

    if (!req.body.title || !req.body.fields) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    await form.save();
    return res.status(201).json({
      message: 'form created successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: 'Internal server error' });
  }
};

const getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        message: "The form doesn't exist",
      });
    }

    return res.status(200).json({ form });
  } catch (error) {
    return res.status(500).json({ error, message: 'Internal server error' });
  }
};

module.exports = {
  createForm,
  getForm,
};
