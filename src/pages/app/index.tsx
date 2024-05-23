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

      <LeadTimeChart durations={sprintDurations} />

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

      </div>
    </div>
  );
}
