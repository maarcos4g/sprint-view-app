import { ChangeEvent, ComponentProps, KeyboardEvent, useEffect, useRef, useState } from "react";

interface PinCodeProps extends ComponentProps<'input'> {
  lenght: number
  onComplete: (pin: string) => void
}

export function PinCode({ lenght, onComplete, ...props }: PinCodeProps) {

  const [otp, setOtp] = useState<string[]>(new Array(lenght).fill(''))
  const [otpActive, setOtpActive] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null)

  function handleOnChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = event.target
    const newOtp: string[] = [...otp]
    newOtp[index] = value.substring(value.length - 1)

    setOtp(newOtp)

    // const isFilled = newOtp.every((digit) => digit !== '');
    // if (isFilled) {
    //   const otpValue = newOtp.join('');
    //   onComplete(otpValue);
    // }

    setOtpActive(value ? index + 1 : index - 1)
  }

  function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === 'Backspace') {
      if (index > 0 && !otp[index]) {
        const newOtp = [...otp]

        newOtp[index] = ''

        setOtp(newOtp)

        inputRef.current?.focus()
        
        setOtpActive(index - 1)
      }
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [otpActive])

  useEffect(() => {
    const isFilled = otp.every((digit) => digit !== '');
    if (isFilled) {
      const otpValue = otp.join('');
      onComplete(otpValue); // Chama onComplete apenas quando o PIN estiver completo
    }
  }, [otp, onComplete]);

  return (
    <div className="flex gap-4">
      {otp.map((digit, index) => {
        return (
          <input
            key={index}
            ref={otpActive === index ? inputRef : null}
            type="number"
            maxLength={1}
            className="w-11 h-10 border border-zinc-300 bg-transparent rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={digit}
            onChange={(event) => handleOnChange(event, index)}
            onKeyDown={(event) => handleOnKeyDown(event, index)}
            {...props}
          />
        )
      })}
    </div>
  )
}