import { ChangeEvent } from "react";

import { Home, Upload } from "lucide-react";

import logo from '/logo.svg'
import { NavLink } from "./nav-link";
import { AccountMenu } from "./account-menu";

import * as xlsx from 'xlsx'
import { cleanData, RawData } from "@/utils/clean-data";

export function Header() {

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return;
    }

    const selectedFile = files[0]

    const reader = new FileReader();
    reader.readAsBinaryString(selectedFile);
    reader.onload = (event) => {
      const data = event.target?.result;
      const excelData = xlsx.read(data, { type: 'binary' });
      const sheetName = excelData.SheetNames[0];
      const sheet = excelData.Sheets[sheetName];
      const jsonData: RawData[] = xlsx.utils.sheet_to_json(sheet);
      const cleanedData = cleanData(jsonData);
      localStorage.setItem('@data', JSON.stringify(cleanedData))
      window.location.reload()
    }
  }

  return (
    <div className="border-b bg-trannsparent border-zinc-300">
      <div className="flex h-16 items-center gap-6 px-6">
        <img src={logo} alt="Logo do Sprint view" />

        <div className="h-6 border border-r border-zinc-400" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
        </nav>

        <input
          onChange={onFileSelected}
          accept=".xlsx"
          type="file"
          name="media"
          id="media"
          className="invisible h-0 w-0"
        />

        <div className="ml-auto flex items-center space-x-2">
          <label htmlFor="media" className="px-4 py-2 border border-zinc-300 flex gap-4 rounded-lg text-base font-bold cursor-pointer">
            Enviar planilha
            <Upload className="size-5" />
          </label>

          <AccountMenu />
        </div>
      </div>
    </div>

  )
}