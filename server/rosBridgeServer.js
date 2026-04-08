import express from "express"
import http from "http"
import { Server } from "socket.io"
import telemetryManager from "./telemetryManager.js"
import { startSimulator } from "./simulatorSource.js"
import { startROS } from "./rosSource.js"

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
  cors:{origin:"*"}
})

server.listen(3001,()=>{
  console.log("Telemetry server running on port 3001")
})

function sendTelemetry(data){
  io.emit("message", data)
}

const simulator = startSimulator(sendTelemetry)
const ros = startROS(sendTelemetry)

const pipelines = {simulator,ros}

telemetryManager.setMode("simulator", pipelines)
console.log("Simulator started")

io.on("connection",(socket)=>{
  console.log("Client connected")
  socket.emit("mode", telemetryManager.getMode())
  socket.on("command",({command})=>{
    console.log("Command received:",command)
    telemetryManager.handleCommand(command)
    socket.emit("log",`Executed: ${command}`)
  })

  socket.on("setTelemetryMode",(mode)=>{
    console.log("Switching telemetry mode to:",mode)
    telemetryManager.setMode(mode,pipelines)
    io.emit("mode",mode)
  })
})