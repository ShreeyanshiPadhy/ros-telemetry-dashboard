let mode = "simulator"

let activePipeline = null

function getMode(){
    return mode
}

function setMode(newMode, pipelines){

    if(newMode !== "simulator" && newMode !== "ros"){
        return
    }

    if(activePipeline){
        activePipeline.stop()
    }

    mode = newMode
    console.log("Telemetry mode set to:", mode)

    activePipeline = pipelines[mode]

    activePipeline.start()
}

function handleCommand(command){

    if(!activePipeline) return

    if(activePipeline.handleCommand){
        activePipeline.handleCommand(command)
    }

}

export default {
    getMode,
    setMode,
    handleCommand
}