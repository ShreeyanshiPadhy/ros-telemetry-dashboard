import { Line } from "react-chartjs-2"

export default function TelemetryGraph({ chartData, chartOptions }) {

  return (
    <section className="flex-[3] bg-surface-container p-8 relative overflow-hidden">

      <div className="flex justify-between mb-4">

        <div>
          <h2 className="text-primary font-headline text-sm tracking-widest">
            CORE_STABILITY_GRAPH
          </h2>

          <p className="text-on-surface-variant text-xs">
            MOTOR CURRENT (A)
          </p>
        </div>

      </div>

      <div className="h-[300px]">
        <Line data={chartData} options={chartOptions}/>
      </div>

    </section>
  )
}