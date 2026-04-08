import { useState, useRef, useEffect } from "react"
import socket from "../socket"

export default function Console({ mode }) {
  const [command, setCommand] = useState("")
  const [logsByMode, setLogsByMode] = useState({
    simulator: [
      "[SYSTEM] Simulator console initialized"
    ],
    ros: [
      "[SYSTEM] ROS console initialized"
    ]
  })

  const logContainerRef = useRef(null)
  const logs = logsByMode[mode] || []
  const handleCommand = (e) => {
    e.preventDefault()
    if (!command.trim() || !mode) return
    setLogsByMode(prev => ({
      ...prev,
      [mode]: [...(prev[mode] || []), `> ${command}`]
    }))
    socket.emit("command", { mode, command })
    setCommand("")
  }

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop =
        logContainerRef.current.scrollHeight
    }
  }, [logs])

  useEffect(() => {
    const handleLog = (log) => {
      setLogsByMode(prev => ({
        ...prev,
        [mode]: [...(prev[mode] || []), log]
      }))
    }
    socket.on("log", handleLog)
    return () => socket.off("log", handleLog)
  }, [mode])

  return (
    <section className="flex flex-col h-full bg-[#05080f] border border-gray-700 rounded-md overflow-hidden font-mono text-xs">
      {/* HEADER */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-700 bg-[#0b0f16]">
        <span className="tracking-widest text-cyan-400 text-[11px]">
          COMMAND_CONSOLE_V4.2 [{mode ? mode.toUpperCase() : "NO MODE"}]
        </span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
        </div>
      </div>

      {/* LOG AREA */}
      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-1 text-gray-300"
      >
        {logs.map((log, i) => (
          <div
            key={i}
            className={`
              leading-5
              ${log.includes("ERROR") ? "text-red-400" : ""}
              ${log.includes("WARN") ? "text-yellow-400" : ""}
              ${log.includes("INFO") ? "text-cyan-400" : ""}
            `}
          >
            {log}
          </div>

        ))}

      </div>
      {/* INPUT BAR */}
      <form
        onSubmit={handleCommand}
        className="flex items-center gap-2 px-3 py-2 border-t border-gray-700 bg-[#0b0f16]"
      >
        <span className="text-cyan-400 font-bold">{">"}</span>
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500"
          placeholder="ENTER SYSTEM COMMAND..."
        />
        <span className="w-[6px] h-[14px] bg-cyan-400 animate-pulse"></span>
      </form>
    </section>
  )
}