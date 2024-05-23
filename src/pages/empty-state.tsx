import illustration from '../assets/illustration.svg'

export function EmptyData() {
  return (
    <div className="w-full flex-1 relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center">
        <img
          src={illustration}
          alt="Ilustração de estado vazio"
          className='size-44'
        />
        <h3 className="font-bold text-xl text-zinc-950">
          Insira uma planilha.
        </h3>
        <p className="text-sm text-zinc-600">
          Para começar, faça o upload da sua planilha e confira se o arquivo está no formato correto.
        </p>
      </div>
    </div>
  )
}