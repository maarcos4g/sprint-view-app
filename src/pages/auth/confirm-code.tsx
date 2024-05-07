import { FormEvent, useState } from "react";
import { Button } from "../../components/button";
import { PinCode } from "../../components/pin-code";

export function ConfirmCode() {

  const [otp, setOtp] = useState('')

  function handleOtpComplete(otp: string) {
    setOtp(otp)
  }

  async function handleConfirmCode(event: FormEvent) {
    event.preventDefault()

    console.log(otp)
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-xl font-bold tracking-tight">
          Confirmação
        </h1>
        <p className="text-sm text-zinc-400">
          Um código de acesso foi enviado para o seu e-mail. Digite abaixo para realizar seu login.
        </p>
      </div>

      <form onSubmit={handleConfirmCode}>
        <div className="flex flex-col items-center justify-center gap-4">
          <PinCode
            lenght={6}
            onComplete={handleOtpComplete}
          />
          <Button
            type="submit"
          >
            Entrar
          </Button>
        </div>
      </form>
    </div>
  )
}