import { ChevronDown } from "lucide-react";

export function Home() {
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

      <div className="w-full h-32 shadow-md rounded-lg px-12 py-4">
        <span className="font-bold text-base">
          Ultimas atualizações (Lead Time)
        </span>

        <div></div>

      </div>
    </div>
  )
}