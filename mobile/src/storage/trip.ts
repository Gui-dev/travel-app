import AsyncStorage from '@react-native-async-storage/async-storage'

export const TRIP_STORAGE_KEY = '@travel.app:trip_id'

const save = async (trip_id: string) => {
  try {
    await AsyncStorage.setItem(TRIP_STORAGE_KEY, trip_id)
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}

const get = async () => {
  try {
    const trip_id = await AsyncStorage.getItem(TRIP_STORAGE_KEY)
    return trip_id
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}

const remove = async () => {
  try {
    await AsyncStorage.removeItem(TRIP_STORAGE_KEY)
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error
  }
}

export const tripStorage = { save, get, remove }
