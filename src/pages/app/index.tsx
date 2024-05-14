import { generateTeamRandomColor } from "@/utils/generate-team-random-color";
import { ChevronDown } from "lucide-react";

export function Home() {

  const iterations = [10, 4, 9, 12, 9, 6, 8, 10, 5, 2, 7, 3]
  const teams = [
    "front-end",
    "backend",
    "mobile",
    "de teste",
  ]
  const colors = teams.map(() => generateTeamRandomColor())

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

        <div className="flex items-end gap-8">
          {iterations.map((iteration, index) => {
            return (
              <div>
                <div className="w-14 bg-sky-400 flex items-center justify-center text-zinc-50 font-bold text-xs" style={{ height: iteration * 12 }}>
                  {iteration * 12}
                </div>
                <span className="text-xs text-zinc-600">Iteração {index + 1}</span>
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

          <div className="flex flex-col items-center justify-center mt-11">
            <div className="grid grid-cols-2 gap-x-2">
              {teams.map((team, index) => {
                const randomColor = generateTeamRandomColor()
                return (
                  <div className="text-xs lowercase text-zinc-950 font-medium flex gap-1 items-center">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[index] }} />
                    <span>Time {team}</span>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              {teams.map((team, index) => {
                const randomMarginTop = Math.random() * 10;
                const randomMarginLeft = Math.random() * 10;
                const randomRotate = Math.random() * 20 - 10; // Rotaciona entre -10 e 10 graus
                const randomTranslateX = Math.random() * 5 - 5; // Translada entre -5px e 5px
                const randomTranslateY = Math.random() * 10 - 5;
                return (
                  <div
                    key={index}
                    className="rounded-full"
                    style={{
                      marginTop: `${randomMarginTop}px`,
                      marginLeft: `${randomMarginLeft}px`,
                      transform: `rotate(${randomRotate}deg) translate(${randomTranslateX}px, ${randomTranslateY}px)`,
                      backgroundColor: colors[index],
                      width: iterations[index] * 6,
                      height: iterations[index] * 6,
                    }}
                  />
                )
              })}
            </div>

            <span className="text-xs text-zinc-300 mt-3">[clique em um dos equipe para carregar os dados]</span>

          </div>
        </div>

        <div className="w-full min-h-[307px] shadow-lg rounded-lg px-8 py-4">
          <span className="font-bold text-base text-zinc-950 flex gap-2">
            Cycle time (detalhes)
            <div
              className="px-2 rounded-full text-zinc-200"
              style={{ backgroundColor: colors[0] }}
            >
              {teams[0]}
            </div>
          </span>
        </div>
      </div>

    </div>
  )
}