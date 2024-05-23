import dayjs from "dayjs"

interface NewDataItem {
  date: Date | string;
  type: string;
  title: string;
  team: string;
}

interface CycleTimeChartProps {
  selectedTeam: string | null
  teamColors: string[]
  teams: string[]
  newDataList: NewDataItem[]
}

export function CycleTimeChart({ selectedTeam, teamColors, teams, newDataList }: CycleTimeChartProps) {
  return (
    <div className="w-full min-h-[307px] shadow-lg rounded-lg px-8 py-4 relative">
      <span className="font-bold text-base text-zinc-950 flex gap-2">
        Cycle time (detalhes)
        {selectedTeam && (
          <div
            className="px-2 rounded-full text-zinc-200"
            style={{ backgroundColor: teamColors[teams.indexOf(selectedTeam)] }}
          >
            {selectedTeam.toLowerCase()}
          </div>
        )}
      </span>

      {selectedTeam ? (
        <div className="mt-4">
          <div className="grid grid-cols-7 gap-2 items-end mb-4">
            {newDataList
              .filter((item) => item.team && item.team.startsWith(selectedTeam))
              .map((item, index) => (
                <div key={index}>
                  <span className="text-xs text-zinc-300 italic font-medium">{item.title}</span>
                  <div
                    className="w-24 h-3 rounded-xl"
                    style={{ backgroundColor: item.type === "Implantacao" ? "#ADEDAC" : "#58AEEC" }}
                  />
                  <span className="text-xs font-bold text-zinc-900">{dayjs().to(item.date)}</span>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-4 absolute bottom-3">
            <div className="flex items-center text-xs font-bold text-zinc-800 gap-1">
              <div className="w-2 h-2 rounded-full bg-[#58AEEC]" />
              <span>Homologação</span>
            </div>
            <div className="flex items-center text-xs font-bold text-zinc-800 gap-1">
              <div className="w-2 h-2 rounded-full bg-[#ADEDAC]" />
              <span>Implantação</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-zinc-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          [clique em uma das equipes ao lado para carregar os dados]
        </p>
      )}
    </div>
  )
}