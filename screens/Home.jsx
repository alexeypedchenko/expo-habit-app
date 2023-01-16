import { useEffect, useMemo, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Pressable, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { isDone } from '../utils'

import {
  fetchHabits,
  selectHabits,
  editHabit,
  selectLoad,
  selectState,
  setActiveDay
} from '../store/reducer'

import { getDocument } from '../firebase/firestore'
import CalendarWeek from '../components/Calendar/CalendarWeek'

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const { activeDay } = useSelector(selectState)
  const habits = useSelector(selectHabits)
  const load = useSelector(selectLoad)
  // console.log('habits:', habits)
  const [data, setData] = useState(null)

  const [isEdit, setIsEdit] = useState(false)

  const eventValues = useMemo(() => {
    if (habits) {
      return Array.from(
        new Set(habits.map(([id, item]) => item.progress).flat())
      )
    }
    return []
  }, [habits])

  console.log('eventValues:', eventValues)

  useEffect(() => {
    // getDocument([
    //   'users',
    //   '9MGXEubvzNfrgMx9cng4',
    //   'habits',
    //   'HZ9FaZiLfIoRMtZpyZhu'
    // ]).then((res) => {
    //   console.log('getDocument', res)
    // })

    dispatch(fetchHabits(['users', '9MGXEubvzNfrgMx9cng4', 'habits']))
  }, [])

  const toggleHabitProgress = (id, data) => {
    if (load) {
      return
    }
    const item = JSON.parse(JSON.stringify(data))
    if (item.progress.includes(activeDay)) {
      item.progress = item.progress.filter((day) => day !== activeDay)
    } else {
      item.progress.push(activeDay)
    }
    dispatch(
      editHabit({
        path: ['users', '9MGXEubvzNfrgMx9cng4', 'habits', id],
        data: item
      })
    )
  }

  return (
    <View className="flex-1 items-center px-4">
      <View className="mt-8 mb-8 relative w-full">
        <Text className="text-xl text-center font-bold">My Simple Habits</Text>
        <Pressable
          className="absolute px-2 py-1 rounded bg-black right-0"
          onPress={() => setIsEdit((state) => !state)}
        >
          <Text className="text-white">Edit</Text>
        </Pressable>
      </View>

      <CalendarWeek
        activeDay={activeDay}
        events={eventValues}
        onSelectDay={(day) => dispatch(setActiveDay(day))}
      />

      <View className="relative w-full mt-8">
        {load && (
          <View className="absolute w-[50px] h-[50px] rounded-[100%] bg-black opacity-50 top-1/2 left-1/2 -mt-[29px] -ml-[25px]"></View>
        )}
        {habits.map(([id, item]) => (
          <Pressable
            key={id}
            className="mb-2 w-full border p-4 rounded-xl"
            onPress={() => {
              if (isEdit) {
                navigation.navigate('habit', { id })
              } else {
                toggleHabitProgress(id, item)
              }
            }}
          >
            <Text className="text-base">
              {item.title} {isDone(item.progress, activeDay) && 'done'}{' '}
              {isEdit && 'Click to edit'}
            </Text>
            <Text className="text-xs">Прогресс: {item.progress.length}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        className="mt-auto w-full border p-4 rounded-xl bg-white mb-4"
        onPress={() => navigation.navigate('habit')}
      >
        <Text className="text-center font-bold">Create new habit</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  )
}

export default Home
