import { createTrip } from '@/actions/create-trip'
import { getTripById } from '@/actions/get-trip-by-id'
import imageBackground from '@/assets/bg.png'
import imageLogo from '@/assets/logo.png'
import { Button } from '@/components/button'
import { Calendar } from '@/components/calendar'
import { GuestEmail } from '@/components/email'
import { Input } from '@/components/input'
import { Loading } from '@/components/loading'
import { Modal } from '@/components/modal'
import { tripStorage } from '@/storage/trip'
import { colors } from '@/styles/colors'
import { type DatesSelected, calendarUtils } from '@/utils/calendarUtils'
import { validateInput } from '@/utils/validateInput'
import dayjs from 'dayjs'
import { router } from 'expo-router'
import {
  ArrowRight,
  AtSign,
  Calendar as CalendarIcon,
  MapPin,
  Settings2,
  UserRoundPlus,
} from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Alert, Image, Keyboard, Platform, Text, View } from 'react-native'
import type { DateData } from 'react-native-calendars'

enum StepForm {
  TRIP_DETAILLS = 1,
  ADD_EMAILS = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

const App = () => {
  const [isCreatingTrip, setIsCreatingTrip] = useState(false)
  const [isGettingTrip, setIsGettingTrip] = useState(true)
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILLS)
  const [destination, setDestination] = useState('')
  const [showModal, setShowModal] = useState(MODAL.NONE)
  const [selectedDates, setSelectedDates] = useState<DatesSelected>(
    {} as DatesSelected,
  )
  const [emailToInvite, setEmailToInvite] = useState('')
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  const handleNextStepForm = () => {
    if (
      destination.trim().length === 0 ||
      !selectedDates.startsAt ||
      !selectedDates.endsAt
    ) {
      return Alert.alert(
        'Detalhes da viagem',
        'Preencha todas as informações da viagem',
      )
    }

    if (destination.trim().length < 4) {
      return Alert.alert(
        'Detalhes da viagem',
        'Destino deve ter pelo menos 4 caracteres',
      )
    }

    if (stepForm === StepForm.TRIP_DETAILLS) {
      return setStepForm(StepForm.ADD_EMAILS)
    }

    Alert.alert('Nova viagem', 'Confirmar viagem ?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: handleCreateTrip,
      },
    ])
  }

  const handleOpenCalendarModal = () => {
    if (stepForm === StepForm.TRIP_DETAILLS) {
      setShowModal(MODAL.CALENDAR)
    }
  }

  const handleCloseModal = () => {
    setShowModal(MODAL.NONE)
  }

  const handleSelectDate = (selectedDay: DateData) => {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    })

    setSelectedDates(dates)
  }

  const handleOpenGuestsModal = () => {
    Keyboard.dismiss()
    setShowModal(MODAL.GUESTS)
  }

  const handleAddEmail = () => {
    if (!validateInput.email(emailToInvite)) {
      return Alert.alert('Convidado', 'E-mail inválido')
    }

    const emailAlreadyExists = emailsToInvite.find(
      email => email === emailToInvite,
    )

    if (emailAlreadyExists) {
      return Alert.alert('Convidado', 'E-mail já foi adicionado')
    }

    setEmailsToInvite(prevState => [...prevState, emailToInvite])
    setEmailToInvite('')
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmailsToInvite(prevState =>
      prevState.filter(email => email !== emailToRemove),
    )
  }

  const saveTrip = async (trip_id: string) => {
    try {
      await tripStorage.save(trip_id)
      router.navigate(`/trip/${trip_id}`)
    } catch (error) {
      Alert.alert('Salvar viagem', 'Não foi possível salvar a viagem')
    }
  }

  const handleCreateTrip = async () => {
    try {
      setIsCreatingTrip(true)
      const trip = await createTrip({
        destination,
        emails_to_invite: emailsToInvite,
        starts_at: dayjs(selectedDates.startsAt?.dateString).toString(),
        ends_at: dayjs(selectedDates.endsAt?.dateString).toString(),
      })
      Alert.alert('Nova viagem', 'Viagem criada com sucesso', [
        {
          text: 'OK, continuar',
          onPress: () => saveTrip(trip.trip_id),
        },
      ])
      setIsCreatingTrip(false)
    } catch (error) {
      setIsCreatingTrip(false)
      console.log(error)
    }
  }

  const getTrip = async () => {
    try {
      const trip_id = await tripStorage.get()

      if (!trip_id) {
        return setIsGettingTrip(false)
      }

      const trip = await getTripById(trip_id)

      if (trip) {
        setIsGettingTrip(false)
        return router.navigate(`/trip/${trip.id}`)
      }
    } catch (error) {
      setIsGettingTrip(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getTrip()
  }, [])

  if (isGettingTrip) {
    return <Loading />
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
            value={destination}
            onChangeText={setDestination}
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
            onFocus={() => Keyboard.dismiss()}
            showSoftInputOnFocus={false}
            onPress={handleOpenCalendarModal}
            value={selectedDates.formatDatesInText}
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
                autoCorrect={false}
                autoCapitalize="none"
                value={
                  emailsToInvite.length > 0
                    ? `${emailsToInvite.length} pessoa(s) convidada(s)`
                    : ''
                }
                onPress={handleOpenGuestsModal}
              />
            </Input>
          </View>
        )}
        <Button onPress={handleNextStepForm} isLoading={isCreatingTrip}>
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

      <Modal
        title="Selecionar datas"
        subtitle="Selecione a data de ida e volta da viagem"
        visible={showModal === MODAL.CALENDAR}
        onClose={handleCloseModal}
      >
        <View className="mt-4 gap-4">
          <Calendar
            onDayPress={handleSelectDate}
            markedDates={selectedDates.dates}
            minDate={dayjs().toISOString()}
          />
          <Button onPress={handleCloseModal}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>

      <Modal
        title="Selecionar convidados"
        subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem"
        visible={showModal === MODAL.GUESTS}
        onClose={handleCloseModal}
      >
        <View className="my-2 flex-wrap items-center border-zinc-800 border-b py-5">
          {emailsToInvite.length > 0 &&
            emailsToInvite.map(email => {
              return (
                <GuestEmail
                  key={email}
                  email={email}
                  onRemove={() => handleRemoveEmail(email)}
                />
              )
            })}
          {emailsToInvite.length === 0 && (
            <Text className="font-normal text-sm text-zinc-600">
              Nenhum e-mail adicionado
            </Text>
          )}
        </View>
        <View className="mt-4 gap-4">
          <Input variant="secondary">
            <AtSign color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Digite o e-mail do convidado"
              placeholderTextColor={colors.zinc[300]}
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailToInvite}
              onChangeText={text => setEmailToInvite(text.toLocaleLowerCase())}
              returnKeyType="send"
              onSubmitEditing={handleAddEmail}
            />
          </Input>
          <Button onPress={handleAddEmail}>
            <Button.Title>Convidar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}

export default App
