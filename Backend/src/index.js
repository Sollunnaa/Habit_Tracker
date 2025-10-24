import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Habit Tracker API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});