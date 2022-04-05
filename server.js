const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/client')));

/*
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
*/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).send('Page not found...');
});


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
