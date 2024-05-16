export interface RawData {
  "ID": number;
  "Work Item Type": string;
  "Titulo": string;
  "PO": string;
  "Status": string;
  "Inicio de Dev": number;
  "Fim Dev": number;
  "Homologacao": number;
  "Implantação": number;
  "Iteration Path": string;
}

export interface CleanedData {
  ID: number;
  WorkItemType: string;
  Titulo: string;
  PO: string;
  Status: string;
  IniciodeDev: string | Date;
  FimDev: string | Date;
  Homologacao: string | Date;
  Implantacao: string | Date;
  IterationPath: string;
}

export function cleanData(data: RawData[]): CleanedData[] {
  return data.map(item => {
    const cleanedItem: Partial<CleanedData> = {};

    for (let key in item) {
      const newKey = key.replace(/\s+/g, '').replace(/^./, str => str.toUpperCase());

      if (typeof item[key as keyof RawData] === 'number' && key.match(/Inicio de Dev|Fim Dev|Homologacao|Implantação/)) {
        //@ts-ignore
        cleanedItem[newKey as keyof CleanedData] = new Date((item[key as keyof RawData] - 25569) * 86400 * 1000).toLocaleDateString();
      } else {
        //@ts-ignore
        cleanedItem[newKey as keyof CleanedData] = item[key as keyof RawData];
      }
    }

    return cleanedItem as CleanedData;
  });
}
