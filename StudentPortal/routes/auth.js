const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { v4: uuidv4 } = require('uuid');  // this is added new 

const JWT_SECRET = 'supersecretkey'; 


const users = [];

// POST /auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check for existing user
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

// hash the pasword
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  users.push({ id: userId, username, password: hashedPassword }); // this is added new
  //users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' }); // this is added new

  //const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;