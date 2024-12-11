const express = require('express');
const multer = require('multer');
const { Telegraf } = require('telegraf');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Telegram Bot Setup with Telegraf
const BOT_TOKEN = '7555604153:AAH7zJi3QeVMazWfkA0abpyHR8R8PpJ2tNs';
const bot = new Telegraf(BOT_TOKEN);
const YOUR_CHAT_ID = '6798323516'; // Replace after getting your chat ID

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Start the bot
bot.launch();

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Upload route
app.post('/upload', upload.single('photo'), (req, res) => {
    const photoPath = req.file.path;

    // Send the photo to your Telegram chat
    bot.telegram
        .sendPhoto(YOUR_CHAT_ID, { source: fs.createReadStream(photoPath) })
        .then(() => {
            res.send('Photo uploaded and sent to your Telegram!');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error sending photo to Telegram.');
        });

  /*  // Optionally delete the photo after sending
    fs.unlink(photoPath, () => {}); */
}); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
