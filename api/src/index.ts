import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import messageController from './messageController';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/messages');

app.use('/api/message', messageController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});