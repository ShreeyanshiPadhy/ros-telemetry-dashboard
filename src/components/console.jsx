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
    <section className="flex-1 bg-surface-container-lowest border-l-2 border-primary/40 p-4 font-mono text-xs flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-3 text-primary/60 border-b border-outline-variant/10 pb-2">

        <span className="text-[10px] tracking-widest">
          COMMAND_CONSOLE_V4.2 [{mode ? mode.toUpperCase() : "NO MODE"}]
        </span>

        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>

      </div>

      {/* Scrollable log area */}
      <div
        ref={logContainerRef}
        className="h-[140px] overflow-y-auto space-y-1 mb-3 text-on-surface-variant pr-2"
      >
        {logs.map((log, i) => (
          <div key={i} className="leading-5">
            {log}
          </div>
        ))}
      </div>

      {/* Command Input */}
      <form
        onSubmit={handleCommand}
        className="bg-surface-container-low p-2 flex items-center gap-2 border border-outline-variant/20"
      >

        <span className="text-primary font-bold">{">"}</span>

        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="bg-transparent border-none outline-none text-primary w-full placeholder:text-primary/20"
          placeholder="ENTER_SYSTEM_COMMAND..."
        />

        <span className="w-[6px] h-[14px] bg-primary animate-pulse"></span>

      </form>

    </section>
  )
}