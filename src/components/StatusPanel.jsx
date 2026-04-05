export default function StatusPanel({ telemetry }) {

  if(!telemetry){
    return <div className="text-gray-400">Waiting for telemetry...</div>
  }

  function Metric({label,value}){
  return(

    <div className="border-b border-outline-variant/10 pb-3">

      <span className="text-xs text-primary/60 font-mono">
        {label}
      </span>

      <div className="text-2xl font-headline font-bold">
        {value}
      </div>

    </div>

  )
}

function RobotState({state}){

  const color =
    state === "MOVING"
      ? "bg-green-400"
      : "bg-yellow-400"

  return(

    <div className="flex items-center gap-2">

      <div className={`w-2 h-2 rounded-full ${color}`}></div>

      <span className="font-bold tracking-widest">
        {state}
      </span>

    </div>

  )
}
  return (

    <section className="bg-surface-container p-6 flex flex-col gap-6">

      <Metric label="BATTERY" value={`${telemetry.batteryLevel.toFixed(2)}%`} />

      <Metric label="TEMPERATURE" value={`${telemetry.temperature.toFixed(2)}°C`} />

      <Metric label="SPEED" value={`${telemetry.speed.toFixed(2)} m/s`} />

      <Metric label="MOTOR CURRENT" value={`${telemetry.motorCurrent.toFixed(2)} A`} />

      <RobotState state={telemetry.robotState} />

    </section>

  )
}