const { User } = require('../models');
const { validateUser } = require('../validations/userValidation');

exports.createUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message),
      details: error.details,
    });
  }
  try {
    const user = await User.create(value);
    return res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({ error: 'Error creating user' });
  }
};
