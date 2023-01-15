import { useEffect, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  addHabit,
  deleteHabit,
  editHabit,
  selectHabits
} from '../store/reducers/main'

const BASE_HABIT = {
  title: '',
  active: true,
  progress: []
}

const Habit = ({ navigation, route }) => {
  const id = route?.params?.id
  const dispatch = useDispatch()
  const habits = useSelector(selectHabits)
  const [habit, setHabit] = useState(BASE_HABIT)

  useEffect(() => {
    if (id) {
      setHabit(habits.find(([_id]) => _id === id)[1])
    }
  }, [id])

  const onSave = () => {
    if (id) {
      dispatch(
        editHabit({
          path: ['users', '9MGXEubvzNfrgMx9cng4', 'habits', id],
          data: habit
        })
      )
        .unwrap()
        .then(() => {
          navigation.navigate('home')
        })
    } else {
      dispatch(
        addHabit({
          path: ['users', '9MGXEubvzNfrgMx9cng4', 'habits'],
          data: habit
        })
      )
        .unwrap()
        .then(() => {
          navigation.navigate('home')
        })
    }
  }

  const onDelete = () => {
    dispatch(
      deleteHabit({ path: ['users', '9MGXEubvzNfrgMx9cng4', 'habits'], id })
    )
      .unwrap()
      .then(() => {
        navigation.navigate('home')
      })
  }

  return (
    <View className="flex-1 px-4">
      <Text className="font-bold text-xl text-center mb-6 mt-2">
        Create new habit
      </Text>
      <TextInput
        className="p-4 border rounded mb-4"
        onChangeText={(text) => {
          setHabit((state) => ({ ...state, title: text }))
        }}
        placeholder="Habit title"
        value={habit.title}
      />

      <Button title="Save" onPress={onSave} />
      <Button title="Back" onPress={() => navigation.navigate('home')} />
      {id && <Button title="Delete" onPress={onDelete} />}
    </View>
  )
}

export default Habit
