let mode = "simulator"

function getMode(){
    return mode
}

let activePipeline = null
function setMode(newMode, pipelines){
    if(newMode!=="simulator" && newMode !== "ros"){
        return
    }

    if(activePipeline){
        activePipeline.stop()
    }
        mode=newMode
        console.log("Telemetry mode set to:", mode)
        activePipeline = pipelines[mode]
        activePipeline.start()
}

export default {
    getMode,
    setMode
}