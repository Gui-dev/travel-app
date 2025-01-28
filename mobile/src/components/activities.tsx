import { createActivity } from '@/actions/create-activity'
import { getActivitiesByTripId } from '@/actions/get-activity-by-id'
import { colors } from '@/styles/colors'
import type { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { CalendarIcon, Clock, PlusIcon, Tag } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import {
  Alert,
  Keyboard,
  Platform,
  SectionList,
  Text,
  View,
} from 'react-native'
import type { TripData } from './../app/trip/[trip_id]'
import { Activity, type ActivityProps } from './activity'
import { Button } from './button'
import { Calendar } from './calendar'
import { Input } from './input'
import { Loading } from './loading'
import { Modal } from './modal'

interface IActivitiesProps {
  tripDetails: TripData
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  NEW_ACTIVITY = 2,
}

interface ITripActivities {
  title: {
    dayNumber: number
    dayName: string
  }
  data: ActivityProps[]
}

export const Activities = ({ tripDetails }: IActivitiesProps) => {
  const [activities, setActivities] = useState<ITripActivities[]>([])
  const [isCreatingActivity, setIsCreatingActivity] = useState(false)
  const [isLoadingActivities, setIsLoadingActivities] = useState(true)
  const [showModal, setShowModal] = useState(MODAL.NONE)
  const [activityTitle, setActivityTitle] = useState('')
  const [activityDate, setActivityDate] = useState('')
  const [activityHour, setActivityHour] = useState('')

  const openModal = () => {
    setShowModal(MODAL.NEW_ACTIVITY)
  }

  const closeModal = () => {
    setShowModal(MODAL.NONE)
  }

  const openCalendarModal = () => {
    setShowModal(MODAL.CALENDAR)
  }

  const resetActivityFields = () => {
    setActivityTitle('')
    setActivityDate('')
    setActivityHour('')
    setShowModal(MODAL.NONE)
  }

  const handleCreateTripActivity = async () => {
    try {
      if (!activityTitle || !activityHour || !activityDate) {
        return Alert.alert('Cadastrar atividade', 'Preencha todos os campos')
      }

      setIsCreatingActivity(true)
      await createActivity({
        tripId: tripDetails.id,
        title: activityTitle,
        occurs_at: dayjs(activityDate)
          .add(Number(activityHour), 'h')
          .toString(),
      })

      Alert.alert('Nova atividade', 'Nova atividade cadastrada com sucesso')
      await getTripActivities()
      resetActivityFields()
    } catch (error) {
      const err = error as AxiosError

      if (
        JSON.stringify(err.response?.data) ===
        JSON.stringify({ message: 'Invalid activity date' })
      ) {
        Alert.alert('Erro', 'Você não pode selecionar o último dia da viagem')
      }
    } finally {
      setIsCreatingActivity(false)
    }
  }

  const getTripActivities = async () => {
    try {
      const activities = await getActivitiesByTripId(tripDetails.id)
      const activitiesToSectionList = activities.map(dayActivity => {
        return {
          title: {
            dayNumber: dayjs(dayActivity.date).date(),
            dayName: dayjs(dayActivity.date)
              .format('dddd')
              .replace('-feira', ''),
          },
          data: dayActivity.activities.map(activity => {
            return {
              id: activity.id,
              title: activity.title,
              hour: dayjs(activity.occurs_at).format('HH[:]mm[h]'),
              isBefore: dayjs(activity.occurs_at).isBefore(dayjs()),
            }
          }),
        }
      })
      setActivities(activitiesToSectionList)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingActivities(false)
    }
  }

  useEffect(() => {
    getTripActivities()
  }, [])

  return (
    <View className="flex-1">
      <View className="mt-5 mb-6 w-full flex-row items-center">
        <Text className="flex-1 font-semibold text-2xl text-zinc-50">
          Atividades
        </Text>
        <Button onPress={openModal}>
          <PlusIcon color={colors.lime[950]} size={20} />
          <Button.Title>Nova atividade</Button.Title>
        </Button>
      </View>

      {isLoadingActivities && <Loading />}

      {!isLoadingActivities && (
        <SectionList
          sections={activities}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <Activity data={item} />
          }}
          renderSectionHeader={({ section }) => {
            return (
              <View className="w-full gap-6">
                <Text className="py-2 font-semibold text-2xl text-zinc-50">
                  Dia {`${section.title.dayNumber} `}
                  <Text className="font-normal text-base text-zinc-500 capitalize">
                    {section.title.dayName}
                  </Text>
                </Text>
                {section.data.length === 0 && (
                  <Text className="mb-8 font-normal text-sm text-zinc-500">
                    Nenhuma atividade cadastrada nessa data
                  </Text>
                )}
              </View>
            )
          }}
          contentContainerClassName="gap-3 pb-48"
          showsHorizontalScrollIndicator={false}
        />
      )}

      <Modal
        title="Cadastrar atividade"
        subtitle="Todos os convidados podem visualizar as atividades"
        visible={showModal === MODAL.NEW_ACTIVITY}
        onClose={closeModal}
      >
        <View className="mt-4 mb-3">
          <Input variant="secondary">
            <Tag color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Qual atividade ?"
              placeholderTextColor={colors.zinc[400]}
              value={activityTitle}
              onChangeText={setActivityTitle}
            />
          </Input>

          <View className="mt-2 w-full flex-row gap-2">
            <Input variant="secondary" className="flex-1">
              <CalendarIcon color={colors.zinc[400]} size={20} />
              <Input.Field
                placeholder="Quando ?"
                placeholderTextColor={colors.zinc[400]}
                cursorColor={colors.zinc[100]}
                selectionColor={
                  Platform.OS === 'ios' ? colors.zinc[100] : undefined
                }
                onFocus={() => Keyboard.dismiss()}
                showSoftInputOnFocus={false}
                onPress={openCalendarModal}
                value={
                  activityDate ? dayjs(activityDate).format('DD [de] MMMM') : ''
                }
              />
            </Input>

            <Input variant="secondary" className="flex-1">
              <Clock color={colors.zinc[400]} size={20} />
              <Input.Field
                placeholder="Horário ?"
                placeholderTextColor={colors.zinc[400]}
                value={activityHour}
                onChangeText={text =>
                  setActivityHour(text.replace('.', '').replace(',', ''))
                }
                keyboardType="numeric"
                maxLength={2}
              />
            </Input>
          </View>
        </View>
        <Button
          onPress={handleCreateTripActivity}
          isLoading={isCreatingActivity}
        >
          <Button.Title>Salvar atividade</Button.Title>
        </Button>
      </Modal>

      <Modal
        title="Selecionar data"
        subtitle="Selecione a data da atividade"
        visible={showModal === MODAL.CALENDAR}
        onClose={closeModal}
      >
        <View className="mt-4 gap-4">
          <Calendar
            onDayPress={day => setActivityDate(day.dateString)}
            markedDates={{ [activityDate]: { selected: true } }}
            initialDate={tripDetails.starts_at.toString()}
            minDate={tripDetails.starts_at.toString()}
            maxDate={tripDetails.ends_at.toString()}
          />
          <Button onPress={() => setShowModal(MODAL.NEW_ACTIVITY)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
