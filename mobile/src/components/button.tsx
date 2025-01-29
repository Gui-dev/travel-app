import clsx from 'clsx'
import { type ReactNode, createContext, useContext } from 'react'
import {
  ActivityIndicator,
  Text,
  type TextProps,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

type Variants = 'primary' | 'secondary'

interface IButtonProps extends TouchableOpacityProps {
  children: ReactNode
  variant?: Variants

  isLoading?: boolean
}

interface ITitleProps extends TextProps {}

const ThemeContext = createContext<{ variant?: Variants }>({})

const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  ...rest
}: IButtonProps) => {
  return (
    <TouchableOpacity
      className={clsx(
        'h-11 flex-row items-center justify-center gap-2 rounded-lg px-2',
        {
          'bg-lime-300': variant === 'primary',
          'bg-zinc-800': variant === 'secondary',
        },
        className,
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      <ThemeContext.Provider value={{ variant }}>
        {isLoading && <ActivityIndicator className="text-lime-950" />}
        {!isLoading && children}
      </ThemeContext.Provider>
    </TouchableOpacity>
  )
}

const Title = ({ ...rest }: ITitleProps) => {
  const { variant } = useContext(ThemeContext)

  return (
    <Text
      className={clsx('font-semibold text-base', {
        'text-lime-950': variant === 'primary',
        'text-zinc-200': variant === 'secondary',
      })}
      {...rest}
    />
  )
}

Button.Title = Title

export { Button }
