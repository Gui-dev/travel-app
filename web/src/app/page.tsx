import { SearchInput } from '@/components/search-input'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="max-w-[720px] px-6 text-center">
        <p className="text-lg text-zinc-300">
          Convide seus amigos e planeje sua próxima viagem!
        </p>
        <SearchInput />
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela Travel.app você automaticamente concorda
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
