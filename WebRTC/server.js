const port = process.env.PORT || 5000
const cors = require('cors')
const express = require('express')
const app = express()
const serve = require('http').Server(app)
const io = require('socket.io')(serve, {
    cors: {
      origin: ['https://speakup-heroku.herokuapp.com', 'localhost'],
      methods: ["GET", "POST"]
    }
  })
const {v4: uuidV4} = require('uuid')

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/join', (req, res) => {
    res.send({ link: uuidV4() });
});

serve.listen(port, () => {
    console.log(`Listening on the port ${port}`);
}).on('error', e => {
    console.error(e);
});

io.on('connection', socket => {
    console.log('socket established')
    socket.on('join-room', (userData) => {
        const { roomID, userID } = userData;
        socket.join(roomID);
        socket.to(roomID).broadcast.emit('new-user-connect', userData);
        socket.on('disconnect', () => {
            socket.to(roomID).broadcast.emit('user-disconnected', userID);
        });
    });
});