import { Button } from "../../components/button";
import { Input } from "../../components/input";

export function SignIn() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-xl font-bold tracking-tight">
          Acessar sua conta
        </h1>
        <p className="text-sm text-gray-500">
          Agilize o desenvolvimento de produtos complexos.
        </p>
      </div>

      <div className="grid gap-6">
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-base font-bold leading-none text-black"
              >
                Seu e-mail
              </label>
              <Input
                id="email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>

            <Button
              type="submit"
            >
              Continuar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}