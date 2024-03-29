const Form = require('../model/Form');

const createForm = async (req, res) => {
  try {
    const form = new Form();

    await form.save();
    return res.status(201).json({
      message: 'form created successfully!',
      form,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: 'Internal server error' });
  }
};

const editForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        message: "The form doesn't exist",
      });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(201).json({
      message: 'form updaed successfully!',
      form: updatedForm,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: 'Internal server error' });
  }
};

const deleteForm = async (req, res) => {
  try {
    await Form.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: 'deleted successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Unable to delete',
      error,
    });
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

const getForms = async (req, res) => {
  try {
    const forms = await Form.find();

    return res.status(200).json({
      message: 'Fetched forms successfully',
      forms,
    });
  } catch (error) {
    return res.status(500).json({ error, message: 'Internal server error' });
  }
};

const saveResponse = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Add the new response to the responses array
    form.responses.push({ data: req.body });

    await form.save();

    return res.status(201).json({
      message: 'Form submitted successfully',
    });
  } catch (error) {
    return res.status(500).json({ error, message: 'Internal server error' });
  }
};

module.exports = {
  createForm,
  editForm,
  deleteForm,
  getForm,
  getForms,
  saveResponse,
};
