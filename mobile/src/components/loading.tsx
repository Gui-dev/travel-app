import { ActivityIndicator } from 'react-native'

export const Loading = () => {
  return (
    <ActivityIndicator
      size="large"
      className="flex-1 items-center justify-center bg-zinc-950 text-lime-300"
    />
  )
}
