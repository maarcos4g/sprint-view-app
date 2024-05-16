import { useEffect, useState } from "react";

import { CleanedData } from "@/utils/clean-data";
import { generateTeamRandomColor } from "@/utils/generate-team-random-color";

import { ChevronDown } from "lucide-react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

dayjs.extend(customParseFormat);

interface NewDataItem {
  date: Date | string
  type: string
  workItemType: string
  team: string
}

export function Home() {

  const [workData, setWorkData] = useState<CleanedData[]>([]);
  const [teams, setTeams] = useState<string[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [newDataList, setNewDataList] = useState<NewDataItem[]>([])
  const [teamColors, setTeamColors] = useState<string[]>([]);

  const data = localStorage.getItem('@data')
  let jsonData: CleanedData[] = []

  if (data == null) {
    return (
      <h1>Ocorreu um erro ao carregar os dados. Envie uma planilha e tente novamente</h1>
    )
  }

  useEffect(() => {
    jsonData = JSON.parse(data) as CleanedData[]
    const updatedData = jsonData.map((item) => ({
      ...item,
      IniciodeDev: dayjs(item.IniciodeDev, 'DD/MM/YYYY').toDate(),
      FimDev: dayjs(item.FimDev, 'DD/MM/YYYY').toDate(),
      Homologacao: dayjs(item.Homologacao, 'DD/MM/YYYY').toDate(),
      Implantacao: dayjs(item.Implantacao, 'DD/MM/YYYY').toDate()
    }))

    const teamsName = updatedData.map((item) => item.Titulo).filter(Boolean)
    const unifiedTeamNames = teamsName.map(name => name.replace(/\s+\d+$/, ''));
    const uniqueTeams = [...new Set(unifiedTeamNames)]

    setTeams(uniqueTeams)
    setWorkData(updatedData)

    const colors = uniqueTeams.map(() => generateTeamRandomColor());
    setTeamColors(colors);
  }, [])

  useEffect(() => {
    // Filtrar e mapear os dados para a nova lista
    const newDataList = workData.flatMap(item => {
      // Verificar se as datas de implantação e homologação estão definidas
      if (item.Implantacao && item.Homologacao) {
        // Se ambas as datas estão definidas, criar dois itens na nova lista
        return [
          { date: item.Implantacao, type: "Implantacao", workItemType: item.WorkItemType, team: item.Titulo }, // Item para implantação
          { date: item.Homologacao, type: "Homologacao", workItemType: item.WorkItemType, team: item.Titulo }, // Item para homologação
        ];
      } else {
        // Se apenas uma das datas está definida, criar um único item na nova lista
        return item.Implantacao
          ? [{ date: item.Implantacao, type: "Implantacao", workItemType: item.WorkItemType, team: item.Titulo }] // Item para implantação
          : [{ date: item.Homologacao, type: "Homologacao", workItemType: item.WorkItemType, team: item.Titulo }]; // Item para homologação
      }
    });

    // Setar a nova lista de dados
    setNewDataList(newDataList);
  }, [workData]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-xl">
            Dashboard
          </span>
          <span className="text-base font-medium text-zinc-500">
            Acompanhe os dados gerais e métricas dos produtos
          </span>
        </div>

        <div className="cursor-no-drop border border-zinc-300 flex items-center gap-3 px-3 py-2 rounded-lg font-bold select-none">
          Informações gerais
          <ChevronDown />
        </div>
      </div>

      <div className="w-full shadow-md rounded-lg px-12 py-4 flex flex-col gap-10">
        <span className="font-bold text-base">
          Últimas atualizações (Lead Time)
        </span>

        <div className="flex items-end gap-8 overflow-x-auto">
          {workData.map((item, index) => {
            let diff: number = 0
            if (item.IniciodeDev && item.FimDev) {
              diff = dayjs(item.FimDev).diff(item.IniciodeDev, 'days')
            }

            const height = diff * 100

            return (
              <div className="">
                <div className="w-14 bg-sky-400 flex items-center justify-center text-zinc-50 font-bold text-xs" style={{ height: (height / 25) }}>
                  {isNaN(diff) ? 0 : diff}
                </div>
                <span className="text-[9px] text-zinc-600">Iteração {index + 1}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-10">
        <div className="min-w-[359px] shadow-md rounded-lg px-4 py-4">
          <span className="font-bold text-base">
            Cycle time - Entregas por equipe
          </span>

          <div className="flex flex-col items-center justify-center mt-11 relative">
            <div className="grid grid-cols-2 gap-x-2">
              {teams.map((team, index) => {
                return (
                  <div className="text-xs lowercase text-zinc-950 font-medium flex gap-1 items-center">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: teamColors[index] }} />
                    <span>Time {team}</span>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              {teams.map((team, index) => {
                const teamCount = teams.filter(t => t === team).length;

                const randomMarginTop = Math.random() * 10;
                const randomMarginLeft = Math.random() * 10;
                const randomRotate = Math.random() * 20 - 10; // Rotaciona entre -10 e 10 graus
                const randomTranslateX = Math.random() * 5 - 5; // Translada entre -5px e 5px
                const randomTranslateY = Math.random() * 10 - 5;
                return (
                  <div
                    key={index}
                    className="rounded-full cursor-pointer"
                    style={{
                      marginTop: `${randomMarginTop}px`,
                      marginLeft: `${randomMarginLeft}px`,
                      transform: `rotate(${randomRotate}deg) translate(${randomTranslateX}px, ${randomTranslateY}px)`,
                      backgroundColor: teamColors[index],
                      width: 10 * 6 * teamCount,
                      height: 10 * 6,
                    }}
                    onClick={() => setSelectedTeam(team)}
                  />
                )
              })}
            </div>

            <span className="text-xs text-zinc-300 mt-3 absolute top-32">[clique em um dos equipe para carregar os dados]</span>

          </div>
        </div>

        <div className="w-full min-h-[307px] shadow-lg rounded-lg px-8 py-4">
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
              {/* {renderChart(getTeamData(selectedTeam))} */}
              <div className="grid grid-cols-7 gap-2">
                {newDataList
                  .filter(item => item.team && item.team.startsWith(selectedTeam))
                  .map((item, _) => (
                    <div>
                      <span className="text-xs text-zinc-300 italic font-medium">
                        {item.workItemType}
                      </span>
                      <div
                        className="w-24 h-3 rounded-xl"
                        style={{ backgroundColor: item.type === 'Implantacao' ? '#ADEDAC' : '#58AEEC' }}
                      />
                      <span className="text-xs font-bold text-zinc-900">
                        {dayjs().to(item.date)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-zinc-500">[clique em uma das equipes ao lado para carregar os dados]</p>
          )}
        </div>
      </div>

    </div>
  )
}