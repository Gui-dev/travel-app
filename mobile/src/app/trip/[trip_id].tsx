import { confirmTripByParticipantId } from '@/actions/confirm-trip-by-participant-id'
import { type ITripDetails, getTripById } from '@/actions/get-trip-by-id'
import { updateTrip } from '@/actions/update-trip'
import { Activities } from '@/components/activities'
import { Button } from '@/components/button'
import { Calendar } from '@/components/calendar'
import { Details } from '@/components/details'
import { Input } from '@/components/input'
import { Loading } from '@/components/loading'
import { Modal } from '@/components/modal'
import { tripStorage } from '@/storage/trip'
import { colors } from '@/styles/colors'
import { type DatesSelected, calendarUtils } from '@/utils/calendarUtils'
import { validateInput } from '@/utils/validateInput'
import dayjs from 'dayjs'
import { router, useLocalSearchParams } from 'expo-router'
import {
  Calendar as CalendarIcon,
  CalendarRange,
  Info,
  Mail,
  MapPin,
  Settings2,
  User,
} from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Alert, Keyboard, Text, TouchableOpacity, View } from 'react-native'
import type { DateData } from 'react-native-calendars'

type ITripParams = {
  trip_id: string
  participant_id?: string
}

enum MODAL {
  NONE = 0,
  UPDATE_TRIP = 1,
  CALENDAR = 2,
  CONFIRM_ATTENDANCE = 3,
}

export type TripData = ITripDetails & { when: string }

const Trip = () => {
  const { trip_id, participant_id } = useLocalSearchParams<ITripParams>()
  const [isLoadingTrip, setIsLoadingTrip] = useState(true)
  const [isUpdatingTrip, setIsUpdatingTrip] = useState(false)
  const [isConfirmingAttendance, setIsConfirmingAttendance] = useState(false)
  const [tripDetails, setTripDetails] = useState<TripData>({} as TripData)
  const [option, setOption] = useState<'activity' | 'details'>('activity')
  const [selectedDates, setSelectedDates] = useState<DatesSelected>(
    {} as DatesSelected,
  )
  const [showModal, setShowModal] = useState(MODAL.NONE)
  const [destination, setDestination] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')

  const startDate = dayjs(tripDetails.starts_at).date()
  const endDate = dayjs(tripDetails.ends_at).date()
  const monthOfTravel = dayjs(tripDetails.ends_at).format('MMMM')

  const getTriDetails = async () => {
    try {
      setIsLoadingTrip(true)

      if (participant_id) {
        setShowModal(MODAL.CONFIRM_ATTENDANCE)
      }

      if (!trip_id) {
        return router.back()
      }

      const trip = await getTripById(trip_id)
      const maxLengthDestination = 14
      const destination =
        trip.destination.length > maxLengthDestination
          ? trip.destination.slice(0, maxLengthDestination).concat('...')
          : trip.destination
      const starts_at = dayjs(trip.starts_at).format('DD')
      const ends_at = dayjs(trip.ends_at).format('DD')
      const month = dayjs(trip.starts_at).format('MMM')

      setDestination(trip.destination)
      setTripDetails({
        ...trip,
        when: `${destination} de ${starts_at} à ${ends_at} de ${month}.`,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingTrip(false)
    }
  }

  const handleSelectDate = (selectedDay: DateData) => {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    })

    setSelectedDates(dates)
  }

  const handleCloseModal = () => {
    setShowModal(MODAL.UPDATE_TRIP)
  }

  const handleUpdateTrip = async () => {
    try {
      setIsUpdatingTrip(true)
      if (!trip_id) {
        return
      }

      if (!destination || !selectedDates.startsAt || !selectedDates.endsAt) {
        return Alert.alert(
          'Aualizar viagem',
          'Lembre-se de, além de preencher o destino, selecione data de início e fim da viagem',
        )
      }

      await updateTrip({
        trip_id,
        destination,
        starts_at: dayjs(selectedDates.startsAt.dateString).toString(),
        ends_at: dayjs(selectedDates.endsAt.dateString).toString(),
      })

      Alert.alert('Atualizar viagem', 'Viagem atualizada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            setShowModal(MODAL.NONE)
            getTriDetails()
          },
        },
      ])
    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdatingTrip(false)
    }
  }

  const resetConfirmTripFields = () => {
    setGuestName('')
    setGuestEmail('')
  }

  const handleConfirmAttendance = async () => {
    try {
      if (!participant_id) {
        return
      }

      if (!guestName.trim() || !guestEmail.trim()) {
        return Alert.alert(
          'Confirmação',
          'Preencha nome e e-mail para confirmar',
        )
      }

      if (!validateInput.email(guestEmail.trim())) {
        return Alert.alert('Confirmação', 'Digite um e-mail válido')
      }

      setIsConfirmingAttendance(true)

      const confirm = await confirmTripByParticipantId({
        participantId: participant_id,
        name: guestName,
        email: guestEmail.trim(),
      })
      Alert.alert('Confirmação', 'Viagem confirmada com sucesso')
      resetConfirmTripFields()
      await tripStorage.save(trip_id)
      setShowModal(MODAL.NONE)
    } catch (error) {
      console.log(error)
      Alert.alert('Confirmação', 'Não foi possível confirmar!')
    } finally {
      setIsConfirmingAttendance(false)
    }
  }

  useEffect(() => {
    getTriDetails()
  }, [])

  if (isLoadingTrip) {
    return <Loading />
  }

  return (
    <View className="flex-1 px-5 pt-16">
      <Input variant="tertiary">
        <MapPin color={colors.zinc[400]} size={20} />
        <Input.Field value={tripDetails.when} readOnly />
        <TouchableOpacity
          activeOpacity={0.7}
          className="size-9 items-center justify-center rounded bg-zinc-800"
          onPress={() => setShowModal(MODAL.UPDATE_TRIP)}
        >
          <Settings2 color={colors.zinc[400]} size={20} />
        </TouchableOpacity>
      </Input>

      {option === 'activity' && <Activities tripDetails={tripDetails} />}
      {option === 'details' && <Details tripId={trip_id} />}

      <View className="-bottom-1 absolute z-10 w-full justify-end self-center bg-zinc-950 pb-5">
        <View className="w-full flex-row gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <Button
            className="flex-1"
            onPress={() => setOption('activity')}
            variant={option === 'activity' ? 'primary' : 'secondary'}
          >
            <CalendarRange
              color={
                option === 'activity' ? colors.lime[950] : colors.zinc[200]
              }
              size={20}
            />
            <Button.Title>Atividades</Button.Title>
          </Button>
          <Button
            className="flex-1"
            onPress={() => setOption('details')}
            variant={option === 'details' ? 'primary' : 'secondary'}
          >
            <Info
              color={option === 'details' ? colors.lime[950] : colors.zinc[200]}
              size={20}
            />
            <Button.Title>Detalhes</Button.Title>
          </Button>
        </View>
      </View>

      <Modal
        title="Atualizar viagem"
        subtitle="Somente quem criou a viagem pode ediatr"
        visible={showModal === MODAL.UPDATE_TRIP}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="my-4 gap-2">
          <Input variant="secondary">
            <MapPin color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Para onde ?"
              className="text-zinc-400"
              placeholderTextColor={colors.zinc[400]}
              value={destination}
              onChangeText={setDestination}
            />
          </Input>

          <Input variant="secondary">
            <CalendarIcon color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Quando ?"
              className="text-zinc-400"
              placeholderTextColor={colors.zinc[400]}
              onPressIn={() => setShowModal(MODAL.CALENDAR)}
              onFocus={() => Keyboard.dismiss()}
              value={selectedDates.formatDatesInText}
            />
          </Input>

          <Button onPress={handleUpdateTrip} isLoading={isUpdatingTrip}>
            <Button.Title>Atualizar</Button.Title>
          </Button>
        </View>
      </Modal>

      <Modal
        title="Selecionar datas"
        subtitle="Selecione a data de ida e volta da viagem"
        visible={showModal === MODAL.CALENDAR}
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
        title="Confirmar presença"
        visible={showModal === MODAL.CONFIRM_ATTENDANCE}
      >
        <View className="mt-4 gap-4">
          <Text className="my-2 font-normal text-zinc-400 leading-6">
            Você foi convidado(a) para participar de uma viagem para{' '}
            <Text className="font-semibold text-zinc-100">
              {tripDetails.destination}
            </Text>{' '}
            nas datas de{' '}
            <Text className="font-semibold text-zinc-100">
              {startDate} à {endDate} de {monthOfTravel}.{'\n\n'}
            </Text>
            Para confirmar sua presença na viagem, preencha os dados abaixo:
          </Text>

          <Input variant="secondary">
            <User color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Seu nome completo"
              placeholderTextColor={colors.zinc[400]}
              value={guestName}
              onChangeText={setGuestName}
            />
          </Input>

          <Input variant="secondary">
            <Mail color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="E-mail de confirmação"
              placeholderTextColor={colors.zinc[400]}
              value={guestEmail}
              onChangeText={setGuestEmail}
            />
          </Input>

          <Button
            onPress={handleConfirmAttendance}
            isLoading={isConfirmingAttendance}
          >
            <Button.Title>Confirmar minha presença</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}

export default Trip
