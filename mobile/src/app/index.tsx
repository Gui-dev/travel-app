import {
  ArrowRight,
  Calendar as CalendarIcon,
  MapPin,
  Settings2,
  UserRoundPlus,
} from 'lucide-react-native'
import { Image, Platform, Text, View } from 'react-native'

import imageLogo from '@/assets/logo.png'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { colors } from '@/styles/colors'

const App = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image source={imageLogo} className="h-8" resizeMode="contain" />
      <Text className="mt-3 text-center font-regular text-lg text-zinc-400">
        Convide seus amigos e planeje sua{'\n'}próxima viagem
      </Text>

      <View className="my-8 w-full gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <Input>
          <MapPin color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Para onde ?"
            placeholderTextColor={colors.zinc[400]}
            cursorColor={colors.zinc[100]}
            selectionColor={
              Platform.OS === 'ios' ? colors.zinc[100] : undefined
            }
          />
        </Input>
        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Quando ?"
            placeholderTextColor={colors.zinc[400]}
            cursorColor={colors.zinc[100]}
            selectionColor={
              Platform.OS === 'ios' ? colors.zinc[100] : undefined
            }
          />
        </Input>

        <View className="border-zinc-800 border-b py-3">
          <Button variant="secondary">
            <Button.Title>Alterar local/data</Button.Title>
            <Settings2 color={colors.zinc[200]} size={20} />
          </Button>
        </View>

        <Input>
          <UserRoundPlus color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Quem estará na viagem ?"
            placeholderTextColor={colors.zinc[400]}
            cursorColor={colors.zinc[100]}
            selectionColor={
              Platform.OS === 'ios' ? colors.zinc[100] : undefined
            }
          />
        </Input>
        <Button>
          <Button.Title>Continuar</Button.Title>
          <ArrowRight color={colors.lime[950]} size={20} />
        </Button>
      </View>

      <Text className="text-center font-normal text-sm text-zinc-500">
        Ao planejar sua viagem pela travel.app você automaticamente concorda com
        nossos{' '}
        <Text className="text-zinc-300 underline">
          termos de uso e políticas de privacidade
        </Text>
      </Text>
    </View>
  )
}

export default App
