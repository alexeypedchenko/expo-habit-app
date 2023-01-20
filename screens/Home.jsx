import { useEffect, useMemo, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Pressable, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { isDone } from '../utils'

import {
  fetchHabits,
  fetchUserData,
  selectHabits,
  selectSettings,
  selectState,
  setActiveDay
} from '../store/reducer'

import CalendarWeek from '../components/Calendar/CalendarWeek'
import HabitList from '../components/habit-list/HabitList'

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const { activeDay } = useSelector(selectState)
  const settings = useSelector(selectSettings)
  const habits = useSelector(selectHabits)

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
    dispatch(fetchHabits(['users', '9MGXEubvzNfrgMx9cng4', 'habits']))
    dispatch(fetchUserData(['users', '9MGXEubvzNfrgMx9cng4']))
  }, [])

  return (
    <View className="flex-1 items-center p-4">
      {settings?.showCalendar && (
        <CalendarWeek
          activeDay={activeDay}
          events={eventValues}
          onSelectDay={(day) => dispatch(setActiveDay(day))}
        />
      )}

      <HabitList />

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
