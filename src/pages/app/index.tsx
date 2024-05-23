import { useEffect, useState } from "react";
import { CleanedData } from "@/utils/clean-data";
import { generateTeamRandomColor } from "@/utils/generate-team-random-color";
import { ChevronDown } from "lucide-react";

import { LeadTimeChart } from "@/components/charts/lead-time";
import { TeamsSprint } from "@/components/charts/teams-sprint";
import { CycleTimeChart } from "@/components/charts/cycle-time";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("pt-br");
dayjs.extend(customParseFormat);

interface NewDataItem {
  date: Date | string;
  type: string;
  title: string;
  team: string;
}

interface SprintData {
  start: Date;
  end: Date;
}

export function Home() {
  const [workData, setWorkData] = useState<CleanedData[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [newDataList, setNewDataList] = useState<NewDataItem[]>([]);
  const [teamColors, setTeamColors] = useState<string[]>([]);
  const [sprintDurations, setSprintDurations] = useState<{ [key: string]: number }>({});

  const data = localStorage.getItem('@data');
  let jsonData: CleanedData[] = [];

  if (data == null) {
    return <h1>Ocorreu um erro ao carregar os dados. Envie uma planilha e tente novamente</h1>;
  }

  useEffect(() => {
    jsonData = JSON.parse(data) as CleanedData[];
    const updatedData = jsonData.map((item) => ({
      ...item,
      IniciodeDev: dayjs(item.IniciodeDev, 'DD/MM/YYYY').toDate(),
      FimDev: dayjs(item.FimDev, 'DD/MM/YYYY').toDate(),
      Homologacao: dayjs(item.Homologacao, 'DD/MM/YYYY').toDate(),
      Implantacao: dayjs(item.Implantacao, 'DD/MM/YYYY').toDate(),
    }));

    const teamsName = updatedData.map((item) => item.Time).filter(Boolean);
    const unifiedTeamNames = teamsName.map((name) => name.replace(/\s+\d+$/, ''));
    const uniqueTeams = [...new Set(unifiedTeamNames)];

    setTeams(uniqueTeams);
    setWorkData(updatedData);

    const colors = uniqueTeams.map(() => generateTeamRandomColor());
    setTeamColors(colors);

    // Calcular a duração das sprints
    const sprintMap: { [key: string]: SprintData } = {};

    updatedData.forEach((item) => {
      const iterationPath = item.IterationPath;
      if (iterationPath) {
        const startDate = item.IniciodeDev;
        const endDate = item.FimDev;

        if (sprintMap[iterationPath]) {
          sprintMap[iterationPath].start = startDate < sprintMap[iterationPath].start ? startDate : sprintMap[iterationPath].start;
          sprintMap[iterationPath].end = endDate > sprintMap[iterationPath].end ? endDate : sprintMap[iterationPath].end;
        } else {
          sprintMap[iterationPath] = { start: startDate, end: endDate };
        }
      }
    });

    const durations = Object.fromEntries(
      Object.entries(sprintMap).map(([iterationPath, { start, end }]) => [
        iterationPath,
        dayjs(end).diff(start, 'days'),
      ])
    );

    setSprintDurations(durations);
  }, []);

  useEffect(() => {
    const newDataList = workData.flatMap((item) => {
      if (item.Implantacao && item.Homologacao) {
        return [
          { date: item.Implantacao, type: "Implantacao", title: item.Titulo, team: item.Time },
          { date: item.Homologacao, type: "Homologacao", title: item.Titulo, team: item.Time },
        ];
      } else {
        return item.Implantacao
          ? [{ date: item.Implantacao, type: "Implantacao", title: item.Titulo, team: item.Time }]
          : [{ date: item.Homologacao, type: "Homologacao", title: item.Titulo, team: item.Time }];
      }
    });

    setNewDataList(newDataList);
  }, [workData]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-xl">Dashboard</span>
          <span className="text-base font-medium text-zinc-500">
            Acompanhe os dados gerais e métricas dos produtos
          </span>
        </div>
        <div className="cursor-no-drop border border-zinc-300 flex items-center gap-3 px-3 py-2 rounded-lg font-bold select-none">
          Informações gerais
          <ChevronDown />
        </div>
      </div>

<<<<<<< HEAD
      <LeadTimeChart durations={sprintDurations} />
=======
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

            if (diff > 0) {
              return (
                <div className="">
                  <div className="w-14 bg-sky-400 flex items-center justify-center text-zinc-50 font-bold text-xs" style={{ height: (height / 25) }}>
                    {isNaN(diff) ? 0 : diff}
                  </div>
                  <span className="text-[9px] text-zinc-600">{item.Titulo}</span>
                </div>
              )
            }            
          })}
        </div>
      </div>
>>>>>>> 6e7ba59f6915c4ad02d4b0840bb346bc31b82be5

      <div className="flex gap-10">
        <TeamsSprint
          setSelectedTeam={setSelectedTeam}
          teamColors={teamColors}
          teams={teams}
        />

        <CycleTimeChart
          newDataList={newDataList}
          selectedTeam={selectedTeam}
          teamColors={teamColors}
          teams={teams}
        />

<<<<<<< HEAD
=======
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

            <span className="text-xs text-zinc-300 mt-3 flex top-32">[clique em um dos equipe para carregar os dados]</span>

          </div>
        </div>

        <div className="w-full min-h-[307px] shadow-lg rounded-lg px-8 py-4 relative">
          <span className="font-bold text-base text-zinc-950 flex gap-2">
            Cycle time (detalhes)
            {selectedTeam && (
              <div
                className="px-2 rounded-full text-black"
                style={{ backgroundColor: teamColors[teams.indexOf(selectedTeam)] }}
              >
                {selectedTeam.toLowerCase()}
              </div>
            )}
          </span>

          {selectedTeam ? (
            <div className="mt-4">
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
            <p className="text-center text-sm text-zinc-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">[clique em uma das equipes ao lado para carregar os dados]</p>
          )}
        </div>
>>>>>>> 6e7ba59f6915c4ad02d4b0840bb346bc31b82be5
      </div>
    </div>
  );
}
