const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3001;

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Open the database
let db = new sqlite3.Database('./nodesql/mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the mydatabase.db database.');
});

// Route to handle form submissions
app.post('/submit-form', (req,res) => { 
  const { name, email } = req.body; 
  const sql = 'INSERT INTO users (name, email) VALUES (?,?)';
  db.run(sql, [name, email], function(err) {
    if(err) {
      return res.status(400).json({ error: err.message});
    }
    res.json({ message: 'User signed up successfully!'});
  });
});

  app.get('/', (req, res) => {
    res.sendFile(__dirname+"/campaign.html")
  })

  app.get('/signup',(req, res) => {
    res.sendFile(__dirname+"/redirectt.html")
  })

  app.post('/signup', (req, res) => {
    // Here, you need to do data processing, colllect the form data from the webpage
    res.redirect('/signup')
  });
// Route to get user data
  app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM  users';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ users: rows });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

