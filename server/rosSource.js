export function startROS(sendTelemetry){
    function start(){
        console.log("ROS started")
    }
    function stop(){
        console.log("ROS stopped")
    }

    return {start, stop}
}