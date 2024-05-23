import { CleanedData } from "./clean-data";

export function setDataList(workData: CleanedData[]) {
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

  return { newDataList }
}