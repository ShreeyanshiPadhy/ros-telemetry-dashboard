export function startSimulator(sendTelemetry){

let batteryLevel = 100
let temperature = 35
let speed = 0
let motorCurrent = 0

const states = ["IDLE","MOVING","TURNING"]
let robotState = "IDLE"
let interval = null
function start(){
    console.log("Simulator pipeline started")
interval = setInterval(()=>{

    batteryLevel -= 0.01

    robotState = states[Math.floor(Math.random()*states.length)]

    if(robotState === "IDLE"){
        speed = 0
    }
    else if(robotState === "MOVING"){
        speed = 1 + Math.random()
    }
    else if(robotState === "TURNING"){
        speed = 0.5
    }

    if(speed === 0){
        motorCurrent = 0.3
    }
    else{
        motorCurrent = 2 + Math.random()*2
    }

    temperature += (Math.random() - 0.5) * 0.05

    const telemetry = {
        motorCurrent,
        batteryLevel,
        temperature,
        speed,
        robotState,
        timestamp: Date.now()
    }

    sendTelemetry(telemetry)

},100)
}

function stop(){
    console.log("Simulator pipeline stopped")
    clearInterval(interval)
}

return {start,stop}
}