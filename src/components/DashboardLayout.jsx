function DashboardLayout({
  graph,
  consolePanel,
  statusPanel,
  changeMode,
  mode,
  streamRate,
  chartRef
}) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-700 bg-gray-800">
        <h1 className="text-lg font-semibold">
          Robot Telemetry Dashboard
        </h1>
        <div className="flex items-center gap-6">
          {/* MODE SELECTOR */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Source:</span>
            <select
              value={mode}
              onChange={(e) => changeMode(e.target.value)}
              className="bg-gray-900 border border-gray-600 px-2 py-1 rounded"
            >
              <option value="simulator">LiveSimulator</option>
              <option value="ros">ROS</option>
            </select>
          </div>

          {/* STREAM RATE */}
          <div className="text-sm text-gray-300">
            {streamRate} Hz
          </div>
        </div>
      </header>

      {/* MAIN DASHBOARD */}
      <main className="flex-1 flex flex-col p-4 gap-4 max-w-[1600px] mx-auto w-full overflow-hidden">

        {/* GRAPH + METRICS */}
        <div className="flex gap-4 overflow-hidden">

          {/* GRAPH */}
          <section className="flex-[3] bg-gray-800 p-4 rounded-lg relative overflow-hidden">

            <button
              onClick={() => chartRef?.current?.resetZoom()}
              className="absolute top-3 right-3 text-xs px-2 py-1 border border-gray-600 rounded hover:bg-gray-700"
            >
              Reset Zoom
            </button>

            <div className="h-full w-full">
              {graph}
            </div>
          </section>

          {/* METRICS PANEL */}
          <section className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col overflow-hidden">
            <h2 className="text-sm font-semibold mb-2 text-gray-300">
              System Metrics
            </h2>
            {statusPanel}
          </section>
        </div>

        {/* COMMAND CONSOLE */}
        <section className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 pt-4 pb-0 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden flex">
  <div className="flex-1 h-full">
    {consolePanel}
  </div>
</div>
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;