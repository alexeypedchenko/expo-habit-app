import { View, Pressable, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editHabit, selectSettings, selectState } from '../../store/reducer'
import { useMemo, useState } from 'react'
import { isDone } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import clsx from 'clsx'

const HabitList = () => {
  const dispatch = useDispatch()
  const { activeDay, habits, load } = useSelector(selectState)
  const settings = useSelector(selectSettings)
  const [isEdit, setIsEdit] = useState(false)
  const navigation = useNavigation()

  const habitsArray = useMemo(() => {
    if (settings?.showInActive || isEdit) {
      return [...habits].sort(([_a, habitA], [_b, habitB]) => {
        if (habitA.active === habitB.active) {
          return 0
        } else if (habitA.active) {
          return -1
        } else {
          return 1
        }
      })
    } else {
      return habits.filter(([_, habit]) => habit.active)
    }
  }, [habits, settings, isEdit])

  const activeHabits = habits.filter(([_, habit]) => habit.active)
  console.log(activeHabits.length)

  const checkedHabits = activeHabits.filter(([_, habit]) =>
    isDone(habit.progress, activeDay)
  )

  const getProgress = (
    (checkedHabits.length / activeHabits.length) *
    100
  ).toFixed(0)

  console.log('getProgress:', getProgress)

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
    <View className="relative w-full">
      <View className="flex flex-row mb-4">
        {settings?.dayProgress && (
          <View className="flex-1 p-1 bg-black rounded-xl mr-4">
            <Text className="text-center text-white">{getProgress}%</Text>
          </View>
        )}
        <Pressable
          className="px-2 py-1 rounded ml-auto bg-black"
          onPress={() => setIsEdit((state) => !state)}
        >
          <Text className="text-white">{isEdit ? 'Edited' : 'Edit'}</Text>
        </Pressable>
      </View>
      {load && (
        <View className="absolute w-[50px] h-[50px] rounded-[100%] bg-black opacity-50 top-1/2 left-1/2 -mt-[29px] -ml-[25px]"></View>
      )}
      {habitsArray.map(([id, item]) => (
        <Pressable
          key={id}
          className={clsx(
            'mb-2 w-full border p-4 rounded-xl',
            !item.active && !isEdit && 'opacity-40'
          )}
          onPress={() => {
            if (isEdit) {
              navigation.navigate('habit', { id })
            } else if (item.active) {
              toggleHabitProgress(id, item)
            }
          }}
        >
          <Text className="text-base">
            {item.title} {isDone(item.progress, activeDay) && 'done'}{' '}
            {isEdit && 'Click to edit'}
          </Text>
          {settings?.habitProgress && (
            <Text className="text-xs">Прогресс: {item.progress.length}</Text>
          )}
        </Pressable>
      ))}
    </View>
  )
}

export default HabitList
