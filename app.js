const express = require('express');
const app = express();
require('dotenv').config();

// Import Router
const homeRoutes = require('./routes/home.routes');
const errorRoutes = require('./routes/error.routes');

// Implement Routes
app.use('/', homeRoutes);
app.use('**', errorRoutes);

// Server Port To Listen
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Port: ${port}`));