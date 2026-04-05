import express from "express"
import http from "http"
import {Server} from "socket.io"
import telemetryManager from "./telemetryManager.js"
import {startSimulator} from "./simulatorSource.js"
import {startROS} from "./rosSource.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin : "http://localhost:5173",
        methods: ["GET","POST"]
    }
})

app.get("/",(req,res)=>{
    res.send(`
        <script src="/socket.io/socket.io.js"></script>
        <script>
            const socket = io();
            socket.on("message", (data)=>{
            console.log("Received:", data);
            });
        </script>
        `)
})

server.listen(3001, () => {
  console.log("Server running on port 3001")
})

function sendTelemetry(data){
    io.emit("message", data)
}

const simulator = startSimulator(sendTelemetry)
const ros = startROS(sendTelemetry)

const pipelines = {
    simulator,
    ros
}

telemetryManager.setMode("simulator", pipelines)
console.log("Simulator started")

io.on("connection", (socket)=>{
    console.log("Client connected")
    socket.emit("mode", telemetryManager.getMode())
    socket.on("command",(cmd=>{
        console.log("Received command:", cmd)
    }))

    socket.on("setTelemetryMode",(mode)=>{
        telemetryManager.setMode(mode,pipelines)
        io.emit("mode", mode)
    })
    
})
