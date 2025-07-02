const bcrypt = require('bcryptjs'); // Usa bcryptjs en vez de bcrypt
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateLogin } = require('../validations/loginValidation');
const { validateUser } = require('../validations/userValidation');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto123';

exports.loginUser = async (req, res) => {
  const { error, value } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((d) => d.message),
      details: error.details,
    });
  }

  try {
    const user = await User.findOne({ where: { email: value.email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      JWT_SECRET,
      { expiresIn: '4h' },
    );

    return res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ error: 'Error en login' });
  }
};

exports.registerUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((d) => d.message),
      details: error.details,
    });
  }
  try {
    const existing = await User.findOne({ where: { email: value.email } });
    if (existing) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const userData = { ...value, password: hashedPassword };

    const user = await User.create(userData);

    const userResponse = user.toJSON();
    delete userResponse.password;

    return res.status(201).json(userResponse);
  } catch (err) {
    console.error('Error registrando usuario:', err);
    return res.status(500).json({ error: 'Error registrando usuario' });
  }
};
