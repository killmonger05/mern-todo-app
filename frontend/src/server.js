const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
console.log("Everything is good ig!");

//Routes
app.use('/api/todos', todoRoutes);
app.use('./api/users', userRoutes);

//MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});