import { Dispatch, SetStateAction } from "react";

interface TeamSprintProps {
  teams: string[]
  teamColors: string[]
  setSelectedTeam: Dispatch<SetStateAction<string | null>>
}

export function TeamsSprint(props: TeamSprintProps) {
  return (
    <div className="min-w-[359px] shadow-md rounded-lg px-4 py-4">
      <span className="font-bold text-base">Cycle time - Entregas por equipe</span>

      <div className="flex flex-col items-center justify-center mt-11 relative">
        <div className="grid grid-cols-2 gap-x-2">
          {props.teams.map((team, index) => {
            return (
              <div className="text-xs lowercase text-zinc-950 font-medium flex gap-1 items-center" key={index}>
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: props.teamColors[index] }} />
                <span>Time {team}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-3 pb-8">
          {props.teams.map((team, index) => {
            const teamCount = props.teams.filter((t) => t === team).length;
            return (
              <div
                key={index}
                className="rounded-full cursor-pointer"
                style={{
                  backgroundColor: props.teamColors[index],
                  width: 10 * 6 * teamCount,
                  height: 10 * 6,
                }}
                onClick={() => props.setSelectedTeam(team)}
              />
            );
          })}
        </div>

        <span className="text-xs text-zinc-300 mt-3 absolute bottom-1">
          [clique em um dos equipe para carregar os dados]
        </span>
      </div>
    </div>
  )
}