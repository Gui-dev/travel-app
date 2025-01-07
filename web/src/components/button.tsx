import type { ComponentProps, ReactNode } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg px-5 font-medium ',
  variants: {
    variant: {
      primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
    },
    size: {
      default: 'py-2',
      full: 'w-full h-11',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

interface IButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export const Button = ({ children, variant, size, ...rest }: IButtonProps) => {
  return (
    <button {...rest} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  )
}
