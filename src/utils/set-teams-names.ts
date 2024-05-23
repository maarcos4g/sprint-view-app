import { CleanedData } from "./clean-data";

export function setTeamsNames(updatedData: CleanedData[]) {
  const teamsName = updatedData.map((item) => item.Time).filter(Boolean);
  const unifiedTeamNames = teamsName.map((name) => name.replace(/\s+\d+$/, ''));
  const uniqueTeams = [...new Set(unifiedTeamNames)];
  return { uniqueTeams }
}