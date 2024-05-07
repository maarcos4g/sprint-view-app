import { ChevronRight } from "lucide-react";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";

export function Unauthorized() {

  const navigate = useNavigate()

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-xl font-bold tracking-tight">
          Acessar negado!
        </h1>
        <p className="text-base text-zinc-800">
          Parece que ocorreu um erro enquanto você estava tentando se autenticar.
        </p>

        <p className="text-sm text-zinc-800">
          Apenas <strong>membros autorizados</strong> podem acessar.
        </p>
      </div>

      <Button
        variant="outline"
        type="submit"
        onClick={() => navigate('/sign-in', {
          replace: true
        })}
      >
        Tentar novamente
        <ChevronRight className="size-4 text-bold" />
      </Button>
    </div>
  )
}