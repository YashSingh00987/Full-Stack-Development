const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3001;
debugger
// Create a MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '@Sql1234',
  database: 'contact_app'
});

// Connect to the MySQL database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// API routes

// Get all contacts
app.get('/contacts', (req, res) => {
  const sql = 'SELECT * FROM contacts';

  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new contact
app.post('/contacts', (req, res) => {
  const { firstName, middleName, lastName, email, phoneNumber1, address } = req.body;
  const sql = 'INSERT INTO contacts (firstName, middleName, lastName, email, phoneNumber1, address) VALUES (?, ?, ?,?, ?, ?)';
  const values = [firstName, middleName, lastName, email, phoneNumber1, address];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId });
  });
});

// Update an existing contact
app.put('/contacts/:id', (req, res) => {
  const contactId = req.params.id;
  const {firstName, middleName, lastName, email, phoneNumber1, address} = req.body;
  const sql = `UPDATE contacts SET firstName = ?,middleName = ?, lastName = ?, email= ?, phoneNumber1 = ?, address = ? WHERE id = ${contactId}`;
  const values = [firstName, middleName, lastName, email, phoneNumber1, address, contactId];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Contact updated successfully' });
  });
});

// Delete a contact
app.delete('/contacts/:id', (req, res) => {
  const contactId = req.params.id;
  const sql = 'DELETE FROM contacts WHERE id = ?';

  connection.query(sql, contactId, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Contact deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});