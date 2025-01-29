import clsx from 'clsx'
import type { ReactNode } from 'react'
import {
  TextInput,
  type TextInputProps,
  View,
  type ViewProps,
} from 'react-native'

type Variants = 'primary' | 'secondary' | 'tertiary'

interface IInputProps extends ViewProps {
  children: ReactNode
  variant?: Variants
}

interface IFieldProps extends TextInputProps {}

const Input = ({
  children,
  variant = 'primary',
  className,
  ...rest
}: IInputProps) => {
  return (
    <View
      className={clsx(
        'h-16 max-h-16 min-h-16 flex-row items-center gap-2',
        {
          'h-14 rounded-lg border border-zinc-800 px-4': variant !== 'primary',
          'bg-zinc-950': variant === 'secondary',
          'bg-zinc-900': variant === 'tertiary',
        },
        className,
      )}
      {...rest}
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
