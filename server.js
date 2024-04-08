const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

const connectDB = require("./DatabseConnection/connection.js");
const { scheduleCronJob } = require('./Routes/cronApi.js');
const { sendMessage } = require("./Controller/Messages/sendMessage.js");

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    }
});

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});

io.on('connection', (socket) => {
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room.convoId}`);

        // Emit an event to notify other users in the room that someone has joined
        io.to(room).emit('user_joined', socket.id);
    });
    socket.on('send_message', async (data) => {
        socket.join(data.convoId);
        // console.log(data.convoId);
        // console.log(`User ${socket.id} joined room ${data.convoId}`);

        try {
            if (true) {
                const result = await sendMessage(data);
                // console.log(result)
                io.to(data.convoId).emit('forward_message', { content: data, result: result });
            }
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });
});


// Including existing routes
app.use("/auth", require('./authRoutes.js'));
app.use("/auth", require('./Routes/postRoutes'));
app.use("/auth", require('./Routes/friendRoutes'));
app.use("/auth", require('./Routes/articleRoutes'));
app.use("/auth", require('./Routes/messageRoutes'));
app.use("/auth", require('./Routes/settingRoutes'));
app.use("/auth", require('./Routes/searchedRoutes'));
app.use("/auth", require('./Routes/scheduledRoutes'));
app.use("/auth", require('./Routes/userInfo'));


connectDB();

// Calling the function to schedule the cron job
scheduleCronJob();

app.listen(port, () => {
    console.log("Node is running at :" + port);
});
