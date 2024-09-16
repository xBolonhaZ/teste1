import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Get all messages
router.get('/', async (req, res) => {
  const messages = await Message.find().sort({ date: -1 });
  res.json(messages);
});

// Post a new message
router.post('/submit', async (req, res) => {
    const { user, text } = req.body;
    const message = new Message({ user, text });
    await message.save();
    res.json(message);
  });
  
  export default router;