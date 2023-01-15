import uuid from 'react-native-uuid'

export const getID = uuid.v4

export const isDone = (progress, activeDay) => {
  return !!progress.find((date) => date === activeDay)
}
