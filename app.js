const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, {  
  retryWrites:true,
  w: 'majority' 
})

.then(() => {
  console.log('Connected to MongoDB');
  app.listen(4000, () => console.log('Server running on port 4000'));
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);


