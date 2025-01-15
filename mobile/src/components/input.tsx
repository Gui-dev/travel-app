import clsx from 'clsx'
import type { ReactNode } from 'react'
import { TextInput, type TextInputProps, View } from 'react-native'

type Variants = 'primary' | 'secondary' | 'tertiary'

interface IInputProps {
  children: ReactNode
  variant?: Variants
}

interface IFieldProps extends TextInputProps {}

const Input = ({ children, variant = 'primary' }: IInputProps) => {
  return (
    <View
      className={clsx('h-16 w-full flex-row items-center gap-2', {
        'h-14 rounded-lg border border-zinc-800 px-4': variant !== 'primary',
        'bg-zinc-950': variant === 'secondary',
        'bg-zinc-900': variant === 'tertiary',
      })}
    >
      {children}
    </View>
  )
}

const Field = ({ ...rest }: IFieldProps) => {
  return (
    <TextInput className="flex-1 font-normal text-lg text-zinc-100" {...rest} />
  )
}

Input.Field = Field

export { Input }
