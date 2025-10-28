import express, { Request, Response } from 'express';
import habitRoute from './routes/habitRoute';
import * as dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});


app.use('/habit', habitRoute);


