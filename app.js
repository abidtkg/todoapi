const express = require('express');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./configs/swagger.config');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// ALLOW CROSS ORIGIN ACCESS
app.use(cors());

// JSON ONLY DEFINED
app.use(express.json());

// PARSE APPLICATION/JSON
app.use(bodyParser.json());

// Import Router
const homeRoutes = require('./routes/home.routes');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const errorRoutes = require('./routes/error.routes');

// Implement Routes
app.use('/', homeRoutes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth', authRoutes);
app.use('/user', profileRoutes);
app.use('**', errorRoutes);


// DATABASE CONNECTION
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection
.once('open', () => console.log('MongoDB Connected'))
.on('error', (error) => {
    console.log('Error', error);
});


// Server Port To Listen
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Port: ${port}`));