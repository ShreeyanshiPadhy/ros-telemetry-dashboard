function DashboardUI({ graph, statusPanel, consolePanel,changeMode,mode, streamRate, chartRef }) {
  return (
    <>
    <main className="flex flex-col lg:p-6 pb-32 flex-1 p-6 gap-6 max-w-[1600px] mx-auto w-full">

      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b border-primary/20">
        <h1 className="text-3xl font-black m:text-3xl text-primary text-primary tracking-[0.2em] font-headline uppercase">
          LIVE TELEMETRY DASHBOARD
        </h1>

<div className="flex flex-wrap items-center gap-2 text-primary/60 font-mono text-xs">
  <span>
    SYSTEM_STATUS: 
    <span className="text-primary ml-1">CONNECTED</span>
  </span>

  <span>
    DATA_SOURCE: 
    <span className="text-primary ml-1">
      {mode ? mode.toUpperCase() : "SIMULATOR"}
    </span>
  </span>

  <span>
    STREAM_RATE: 
    <span className="text-primary ml-1">
      {streamRate} Hz
    </span>
  </span>

</div>
      </header>
      <nav className="flex gap-8 mb-2 border-b border-white/5 px-2">
        <button
  onClick={() => changeMode("simulator")}
  className="relative pb-3 text-xs font-bold tracking-[0.2em] text-primary uppercase group flicker-on-click"
>
  LIVE SIMULATOR
</button>

        <button
  onClick={() => changeMode("ros")}
  className="pb-3 text-xs font-bold tracking-[0.2em] text-on-surface-variant/40 uppercase hover:text-on-surface-variant/80 transition-colors flicker-on-click"
>
  ROS BRIDGE
</button>
      </nav>
      <div className="flex-[2] flex gap-6 overflow-hidden flex-col lg:flex-row">
        <section className="flex-[3] bg-surface-container p-8 relative overflow-hidden">
          <button
  onClick={() => chartRef?.current?.resetZoom()}
  className="absolute top-4 right-4 text-xs font-mono text-primary"
>
  Reset Zoom
</button>
          <div className="flex-1">
            {graph}
          </div>
        </section>
        <section className="flex-1 bg-surface-container p-6 flex flex-col border-l border-primary/20">
          <div className="w-full lg:w-1/4">
            {statusPanel}
          </div>
        </section>

      </div>
      <section className="flex-1 bg-surface-container-lowest border-l-2 border-primary/40 p-4 font-mono text-xs flex flex-col">
        {consolePanel}
      </section>

    </main>
    {/* MOBILE FOOTER */}
{/* MOBILE SYSTEM STATUS FOOTER */}
<div className="fixed bottom-0 left-0 right-0 bg-black border-t border-cyan-700 lg:hidden">
  <div className="text-xs font-mono text-cyan-400 px-4 py-2 space-y-1">
    <div>SYSTEM_STATUS: CONNECTED</div>
    <div>DATA_SOURCE: {mode ? mode.toUpperCase() : "UNKNOWN"}</div>
    <div>STREAM_RATE: {streamRate} Hz</div>
  </div>
</div>
    </>
  )
}

export default DashboardUI