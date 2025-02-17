import { FormEvent } from 'react'
import Banner from '../assets/banner.png'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const emailIsValid = validateInput('email', event.currentTarget.email.value)
    const passwordIsValid = validateInput(
      'password',
      event.currentTarget.password.value,
    )

    if (!emailIsValid) {
      showWarningMessage('email')
    }

    if (!passwordIsValid) {
      showWarningMessage('password')
    }

    if (emailIsValid && passwordIsValid) {
      const submitButton = document.getElementById('submit-button')
      if (submitButton) {
        submitButton.setAttribute('disabled', 'true')
        setTimeout(() => {
          return navigate('/welcome')
        }, 1500)
      }
    }
  }

  function validateInput(name: string, value: string) {
    switch (name) {
      case 'email': {
        return /^[\w.-]+@[\w-]+\.[\w.-]{2,}$/.test(value)
      }

      case 'password': {
        return /^.{8,}$/.test(value)
      }
    }
  }

  function showWarningMessage(name: string) {
    const warning = document.getElementById(`warning-${name}`)
    if (warning) {
      warning.classList.remove('hidden')

      setTimeout(() => {
        warning.classList.add('hidden')
      }, 1500)
    }
  }

  return (
    <div className="flex justify-between">
      <section className="p-14 sm:w-full sm:p-8">
        <h1 className="relative inline-block text-5xl font-bold leading-[65px] text-gray-200 after:absolute after:-right-4 after:bottom-4 after:h-3 after:w-3 after:rounded-full after:bg-eclipse-43 sm:text-2xl sm:after:-right-3 sm:after:bottom-[.5rem] sm:after:h-1.5 sm:after:w-1.5">
          Faça seu login
        </h1>

        <form className="mt-14 flex flex-col sm:mt-10" onSubmit={handleSubmit}>
          <label className="text-sm text-gray-400">
            Email
            <div className="mt-2 w-fit rounded-xl p-[1px] transition-all focus-within:bg-eclipse-10 focus-within:shadow-input sm:w-full">
              <input
                type="email"
                id="email"
                className="w-[355px] rounded-xl bg-neutral-900 p-3 text-base focus-within:outline-0 sm:w-full sm:text-sm"
              />
            </div>
            <span
              className="absolute hidden text-xs text-red-500"
              id="warning-email"
            >
              E-mail inválido
            </span>
          </label>

          <label className="mt-6 text-sm text-gray-400">
            Senha
            <div className="mt-2 w-fit rounded-xl p-[1px] transition-all focus-within:bg-eclipse-10 focus-within:shadow-input sm:w-full">
              <input
                type="password"
                id="password"
                className="w-[355px] rounded-xl bg-neutral-900 p-3 text-base focus-within:outline-0 sm:w-full sm:text-sm"
              />
            </div>
            <span
              className="absolute hidden text-xs text-red-500"
              id="warning-password"
            >
              Senha inválida (mínimo 8 caracteres)
            </span>
          </label>

          <a
            href="#"
            className="mt-5 self-end text-sm underline hover:text-gray-300 sm:text-xs"
          >
            Esqueci minha senha
          </a>

          <button
            id="submit-button"
            className="mt-9 w-[355px] rounded-xl bg-eclipse-10 p-2 text-2xl font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-50 sm:w-full sm:text-xl"
          >
            Entrar
          </button>

          <a
            href="#"
            className="mt-9 self-center text-sm underline hover:text-gray-300 sm:text-xs"
          >
            Ainda não tenho conta
          </a>
        </form>
      </section>

      <section className="relative after:absolute after:top-0 after:z-10 after:h-full after:w-full after:bg-black/70 md:hidden">
        <img src={Banner} alt="Banner com montanhas e céu estrelado" />
      </section>
    </div>
  )
}
