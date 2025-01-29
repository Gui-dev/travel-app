import { createLink } from '@/actions/create-link'
import { getLinksByTripId } from '@/actions/get-links-by-trip-id'
import { getParticipantsByTripId } from '@/actions/get-participants-by-trip-id'
import { colors } from '@/styles/colors'
import { validateInput } from '@/utils/validateInput'
import { Plus } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { Button } from './button'
import { Input } from './input'
import { Loading } from './loading'
import { Modal } from './modal'
import { Participant, type ParticipantProps } from './participant'
import { TripLink, type TripLinkProps } from './trip-link'

interface IDetailsProps {
  tripId: string
}

export const Details = ({ tripId }: IDetailsProps) => {
  const [showModal, setShowModal] = useState(false)
  const [isCreatingLinkTrip, setIsCreatingLinkTrip] = useState(false)
  const [isGettingLinkTrip, setIsGettingLinkTrip] = useState(true)
  const [isGettingParticipnatsTrip, setIsGettingParticipnatsTrip] =
    useState(true)
  const [linkTitle, setLinkTitle] = useState('')
  const [linkURL, setLinkURL] = useState('')
  const [links, setLinks] = useState<TripLinkProps[]>([])
  const [participants, setParticipants] = useState<ParticipantProps[]>([])

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const resetLinkFields = () => {
    setLinkTitle('')
    setLinkURL('')
  }

  const getTripLinks = async () => {
    try {
      const links = await getLinksByTripId(tripId)
      setLinks(links)
    } catch (error) {
      console.log(error)
    } finally {
      setIsGettingLinkTrip(false)
    }
  }

  const getTripParticipants = async () => {
    try {
      const participants = await getParticipantsByTripId(tripId)
      setParticipants(participants)
    } catch (error) {
      console.log(error)
    } finally {
      setIsGettingParticipnatsTrip(false)
    }
  }

  const handleCreateLink = async () => {
    try {
      if (!linkTitle.trim()) {
        return Alert.alert('Link', 'Informe um título para o link')
      }
      if (!validateInput.url(linkURL.trim())) {
        return Alert.alert('Link', 'Link inválido!!!')
      }

      setIsCreatingLinkTrip(true)
      await createLink({
        tripId,
        title: linkTitle,
        url: linkURL,
      })
      Alert.alert('Link', 'Link criado com sucesso')
      resetLinkFields()
      await getTripLinks()
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreatingLinkTrip(false)
    }
  }

  useEffect(() => {
    getTripLinks()
    getTripParticipants()
  }, [])

  return (
    <View className="mt-10 flex-1">
      <Text className="mb-2 font-semibold text-2xl text-zinc-50">
        Links importantes
      </Text>

      <View className="flex-1">
        {isGettingLinkTrip && <Loading />}

        {links.length <= 0 && (
          <Text className="mt-2 mb-6 font-normal text-base text-zinc-400">
            Nenhum link adicionado
          </Text>
        )}

        {links.length > 0 && !isGettingLinkTrip && (
          <FlatList
            data={links}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return <TripLink data={item} />
            }}
          />
        )}

        <Button variant="secondary" onPress={handleOpenModal}>
          <Plus color={colors.zinc[200]} size={20} />
          <Button.Title>Cadastrar novo link</Button.Title>
        </Button>
      </View>

      <View className="mt-6 h-full flex-1 border-zinc-800 border-t">
        <Text className="my-6 font-semibold text-2xl text-zinc-50">
          Convidados
        </Text>

        <FlatList
          data={participants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <Participant data={item} />
          }}
          contentContainerClassName="gap-4 pb-44"
        />
      </View>

      <Modal
        title="Cadastrar link"
        subtitle=""
        visible={showModal}
        onClose={handleCloseModal}
      >
        <View className="mb-3 gap-2">
          <Input variant="secondary">
            <Input.Field
              placeholder="Título do link"
              placeholderTextColor={colors.zinc[400]}
              onChangeText={setLinkTitle}
            />
          </Input>
          <Input variant="secondary">
            <Input.Field
              placeholder="URL"
              placeholderTextColor={colors.zinc[400]}
              keyboardType="url"
              onChangeText={setLinkURL}
            />
          </Input>

          <Button onPress={handleCreateLink} isLoading={isCreatingLinkTrip}>
            <Button.Title>Salvar link</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
