const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // כתובת הReact app
}));
app.use(express.json());

// Basic route
app.get('/api/test', (req, res) => {
  res.json({ message: 'החיבור בין React ל-Node עובד!' });
});

// Additional routes
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'משה', email: 'moshe@email.com' },
    { id: 2, name: 'שרה', email: 'sarah@email.com' }
  ];
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now(), name, email };
  console.log('משתמש חדש נוצר:', newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});