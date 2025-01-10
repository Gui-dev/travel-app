import { CreateTrip } from '@/components/create-trip'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-center bg-pattern bg-no-repeat">
      <div className="w-full max-w-[720px] space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logo.svg" alt="Image logo" width={158} height={32} />
          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <CreateTrip />
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela Travel.app você automaticamente concorda{' '}
          <br />
          com nossos{' '}
          <Link href="/" className="text-zinc-300 underline">
            termos de uso
          </Link>{' '}
          e{' '}
          <Link href="/" className="text-zinc-300 underline">
            políticas de privacidade
          </Link>
        </p>
      </div>
    </div>
  )
}
