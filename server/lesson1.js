const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// הגדרת OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // הכי טוב לשים במשתנה סביבה
});
const openai = new OpenAIApi(configuration);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Basic route לבדיקה
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is connected!' });
});

// Chat route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: message }
      ],
    });

    res.json({ 
      reply: chatCompletion.data.choices[0].message.content,
      // timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// הפונקציה שלך לדוגמה
async function callChatGPT() {
    const chatHistory = [];
    chatHistory.push({ role: "system", content: "You are a Javascript Developer" });
    chatHistory.push({ role: "user", content: "Tell me a joke" });
    
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chatHistory,
    });

    console.log(chatCompletion.data.choices[0].message.content);
    chatHistory.push({ role: "assistant", content: chatCompletion.data.choices[0].message.content });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});