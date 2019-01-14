/*
 * Express Example
 */

// Dependencies
const express = require('express');
const app = express();
const NGOdatasRoutes = require('./routes/NGOdatas');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000


//  Starting MongoDB connection
mongoose.connect('mongodb://husam:h123456@ds217671.mlab.com:17671/hus_db', { useNewUrlParser: true });

//  To Check if the connection works fine or not
mongoose.connection.on('connected', () => {
  console.log('\x1b[36m%s\x1b[0m', 'mongo has been connected...');
});

// MiddleWare
app.use(express.json());


// Route MiddleWare 
app.use('/api/NGO', NGOdatasRoutes);


// Starting the server
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
