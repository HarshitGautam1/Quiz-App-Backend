const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/quizzes', quizRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/results', resultRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  return errorResponse(res, 500, 'Internal Server Error');
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT , () => console.log(`Sever running on port: ${PORT}`)
)