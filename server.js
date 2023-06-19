const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname)));

// Set the MIME type for CSS files
app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }
  next();
});

// Create a MySQL connection pool
const connection = mysql.createPool({
  host: 'AthulArjun',
  user: 'username',
  password: 'password',
  database: 'users',
  connectionLimit: 5, // Adjust the connection limit as needed
});

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Create a route for handling login requests
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', username, password);

   // Query the database to check if the provided username and password match
   const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
   const values = [username, password];
 
   connection.query(query, values, (error, results) => {
     if (error) {
       console.error('Error executing login query:', error);
       res.status(500).json({ error: 'Internal Server Error' });
       return;
     }
 
     if (results.length === 1) {
       console.log('Successful login for:', username);
       res.redirect('/home.html'); // Redirect to the home page after successful login
     } else {
       console.log('Invalid username or password:', username, password);
       res.send('Invalid username or password');
     }
   });
 });
 
 /* // Check if the provided username and password match the stored data
  if (username === 'athul' && password === '1234') {
    console.log('Successful login for Athul');
    res.redirect('/home.html');
  } else if (username === 'ashwin' && password === '0000') {
    console.log('Successful login for Ashwin');
    res.redirect('/home.html');
  } else {
    console.log('Invalid username or password:', username, password);
    res.send('Invalid username or password');
  }
});

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'login',
  connectionLimit: 5, // Adjust the connection limit as needed
});

// Acquire a connection from the pool
function getConnection() {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    });
  });
}

// Release the connection back to the pool
function releaseConnection(connection) {
  connection.release();
}

// Example function to execute a query
async function executeQuery(query, values) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      releaseConnection(connection);
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

// Retrieve the profile data for the logged-in student
async function fetchStudentProfile(username) {
  try {
    const query = 'SELECT * FROM students WHERE username = ?';
    const values = [username];
    const student = await executeQuery(query, values);
    return student[0];
  } catch (error) {
    console.error('Error fetching student profile:', error);
    throw error;
  }
}

// Example usage of the fetchStudentProfile function
app.get('/profile/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const student = await fetchStudentProfile(username);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student profile' });
  }
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database!');
}); */

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
