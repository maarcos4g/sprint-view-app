interface LeadTimeChartProps {
  durations: { [key: string]: number }
}

export function LeadTimeChart(props: LeadTimeChartProps) {
  return (
    <div className="w-full shadow-md rounded-lg px-12 py-4 flex flex-col gap-10">
      <span className="font-bold text-base">Últimas atualizações (Lead Time)</span>

      <div className="flex items-end gap-8 overflow-x-auto">
        {Object.entries(props.durations).map(([sprint, duration]) => {
          const height = Math.abs(duration);

          return (
            <div key={sprint}>
              <div
                className="w-14 bg-sky-400 flex items-center justify-center text-zinc-50 font-bold text-xs"
                style={{ height: height > 100 ? `${height * 2}px` : `${height * 3}px` }}
              >
                {Math.abs(duration)}
              </div>
              <span className="text-[9px] text-zinc-600">{sprint}</span>
            </div>
          );
        })}
      </div>
    </div>
  )
}