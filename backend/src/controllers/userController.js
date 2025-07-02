const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { validateUser } = require('../validations/userValidation');

exports.createUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((d) => d.message),
      details: error.details,
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(value.password, 10);
    const userData = { ...value, password: hashedPassword };

    const user = await User.create(userData);

    const userResponse = user.toJSON();
    delete userResponse.password;

    return res.status(201).json(userResponse);
  } catch (err) {
    console.error('Error creating user:', err);

    // Aquí capturamos duplicados
    if (err.name === 'SequelizeUniqueConstraintError') {
      const field = err.errors && err.errors[0]?.path;
      return res.status(409).json({
        error: `Ya existe un usuario con ese ${field || 'dato único'}.`,
      });
    }
    return res.status(500).json({ error: 'Error creating user' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).json({ error: 'Error fetching users' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ error: 'Error fetching user' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { error, value } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((d) => d.message),
      details: error.details,
    });
  }
  try {
    const [updated] = await User.update(value, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = await User.findByPk(id);
    return res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    return res.status(500).json({ error: 'Error updating user' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).json({ error: 'Error deleting user' });
  }
};

exports.verifyUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.verified = true;
    await user.save();
    return res.json({ message: 'User verified successfully', user });
  } catch (err) {
    console.error('Error verifying user:', err);
    return res.status(500).json({ error: 'Error verifying user' });
  }
};
