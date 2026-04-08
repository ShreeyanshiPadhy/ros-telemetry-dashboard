import socket from './socket'
import zoomPlugin from "chartjs-plugin-zoom"
import DashboardUI from "./components/DashboardLayout"
import TelemetryGraph from "./components/TelemetryGraph"
import StatusPanel from "./components/StatusPanel"
import Console from "./components/console"
import {useEffect,useState,useRef} from 'react'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from "chart.js"

ChartJS.register(
  LineElement,PointElement,LinearScale,CategoryScale
)

ChartJS.register(zoomPlugin)

function App() {
  window.socket = socket
  const [timeIndex, setTimeIndex] = useState(0)
  const[dataPoints, setDataPoints] = useState([])
  const [telemetryMode, setTelemetryMode] = useState(null)
  const [telemetry, setTelemetry] = useState(null)
  const packetCount = useRef(0)
  const chartRef = useRef(null)
  const [streamRate, setStreamRate] = useState(0)
  const changeMode = (mode) => {
  socket.emit("setTelemetryMode", mode)
}
  useEffect(()=>{
    socket.on("mode",(mode)=>{
      setTelemetryMode(mode)

      setTelemetry({
    batteryLevel: 0,
    temperature: 0,
    speed: 0,
    motorCurrent: 0,
    robotState: "IDLE"
  })
  
      setDataPoints([])
      setTimeIndex(0)
      setTelemetry(null)
      packetCount.current = 0
      setStreamRate(0)

      
    })
    socket.on("message",(data)=>{
      packetCount.current +=1
      setTelemetry(data)
      setTimeIndex(prev=>prev+1)
      setDataPoints(prev=>{
        const updated = [...prev,data.motorCurrent]

        if(updated.length>75){
          updated.shift()
        }
        return updated
      })
    })

    return()=>{
      socket.off("message")
    }
  },[])

  useEffect(()=>{
    console.log("Current data points:",dataPoints) 
  },[dataPoints])

  const chartData={
    labels: dataPoints.map((_,i)=>timeIndex - dataPoints.length +i+1),
    datasets: [
      {
        label: "Motor Current",
        data: [...dataPoints],
        borderColor: "cyan",
        tension: 0.3
      }
    ]
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      setStreamRate(packetCount.current)
      packetCount.current = 0
    },1000)

    return()=>{
      clearInterval(interval)
    }
  },[])

  const chartOptions = {
  responsive: true,
  animation: false,

  interaction: {
    mode: "index",
    intersect: false
  },

  plugins: {
    tooltip: {
      enabled: true
    },

    legend: {
      display: true
    },

    zoom: {
      pan: {
        enabled: true,
        mode: "x"
      },

      zoom: {
        wheel: {
          enabled: true
        },

        pinch: {
          enabled: true
        },

        mode: "x"
      }
    }
  }
}

return (
  <DashboardUI
    graph={
      <TelemetryGraph
        chartRef={chartRef}
        chartData={chartData}
        chartOptions={chartOptions}
      />
    }
    statusPanel={<StatusPanel telemetry={telemetry} />}
    consolePanel={<Console mode={telemetryMode} />}
    changeMode={changeMode}
    mode={telemetryMode}
    streamRate={streamRate}
    chartRef={chartRef}
  />
)
}

export default App
