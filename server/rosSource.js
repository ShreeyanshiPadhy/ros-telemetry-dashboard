import * as ROSLIB from "roslib"

export function startROS(sendTelemetry){

  const ros = new ROSLIB.Ros({
    url: "ws://localhost:9090"
  })

  let telemetry = {
    motorCurrent: 0,
    batteryLevel: 0,
    temperature: 0,
    speed: 0,
    robotState: "IDLE",
    timestamp: Date.now()
  }

  const motorTopic = new ROSLIB.Topic({
    ros,
    name: "/motor_current",
    messageType: "std_msgs/Float32"
  })

  const batteryTopic = new ROSLIB.Topic({
    ros,
    name: "/battery_level",
    messageType: "std_msgs/Float32"
  })

  const tempTopic = new ROSLIB.Topic({
    ros,
    name: "/temperature",
    messageType: "std_msgs/Float32"
  })

  const speedTopic = new ROSLIB.Topic({
    ros,
    name: "/speed",
    messageType: "std_msgs/Float32"
  })

  const stateTopic = new ROSLIB.Topic({
    ros,
    name: "/robot_state",
    messageType: "std_msgs/String"
  })

  function start(){

    console.log("ROS pipeline started")

    motorTopic.subscribe(msg => {
      telemetry.motorCurrent = msg.data
    })

    batteryTopic.subscribe(msg => {
      telemetry.batteryLevel = msg.data
    })

    tempTopic.subscribe(msg => {
      telemetry.temperature = msg.data
    })

    speedTopic.subscribe(msg => {
      telemetry.speed = msg.data
    })

    stateTopic.subscribe(msg => {
      telemetry.robotState = msg.data
    })

    setInterval(()=>{
      telemetry.timestamp = Date.now()
      sendTelemetry({...telemetry})
    },100)

  }

  function stop(){
    motorTopic.unsubscribe()
    batteryTopic.unsubscribe()
    tempTopic.unsubscribe()
    speedTopic.unsubscribe()
    stateTopic.unsubscribe()
  }

  function handleCommand(command){
    console.log("Sending command to ROS:", command)
  }

  return { start, stop, handleCommand }

}