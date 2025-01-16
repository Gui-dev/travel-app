import {
  ArrowRight,
  Calendar as CalendarIcon,
  MapPin,
  Settings2,
  UserRoundPlus,
} from 'lucide-react-native'
import { useState } from 'react'
import { Image, Platform, Text, View } from 'react-native'

import imageBackground from '@/assets/bg.png'
import imageLogo from '@/assets/logo.png'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { colors } from '@/styles/colors'

enum StepForm {
  TRIP_DETAILLS = 1,
  ADD_EMAILS = 2,
}

const App = () => {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILLS)

  const handleNextStepForm = () => {
    if (stepForm === StepForm.TRIP_DETAILLS) {
      return setStepForm(StepForm.ADD_EMAILS)
    }
  }

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image source={imageLogo} className="h-8" resizeMode="contain" />
      <Image source={imageBackground} className="absolute" />
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
            editable={stepForm === StepForm.TRIP_DETAILLS}
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
            editable={stepForm === StepForm.TRIP_DETAILLS}
          />
        </Input>

        {stepForm === StepForm.ADD_EMAILS && (
          <View>
            <View className="border-zinc-800 border-b py-3">
              <Button
                variant="secondary"
                onPress={() => setStepForm(StepForm.TRIP_DETAILLS)}
              >
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
          </View>
        )}
        <Button onPress={handleNextStepForm}>
          <Button.Title>
            {stepForm === StepForm.TRIP_DETAILLS
              ? 'Continuar'
              : 'Continuar Viagem'}
          </Button.Title>
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
