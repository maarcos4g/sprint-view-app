import dayjs from "dayjs";
import { CleanedData } from "./clean-data";

interface SprintData {
  start: Date | string;
  end: Date | string;
}

export function setDurations(updatedData: CleanedData[]) {
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

  return { durations }
}