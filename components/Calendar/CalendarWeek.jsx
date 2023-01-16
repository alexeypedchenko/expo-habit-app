import clsx from 'clsx'
import React, { useState, useMemo } from 'react'
import { Button, Pressable, Text, View } from 'react-native'
import { formatDate, TODAY, DAY } from '../../utils/date'
import { DAYS_OF_WEEK, MONTHS } from './utils'

// type Props = {
//   activeDay?: string
//   events?: string[]
//   onSelectDay?: (day: string) => void
// }

const CalendarWeek = ({ activeDay, events, onSelectDay }) => {
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7]

  const initWeek = daysOfWeek.map((dayOfWeek) => {
    const currDayOfWeek = new Date(TODAY).getDay()
    const dow = new Date(TODAY).getTime() + DAY * dayOfWeek
    const cdow = currDayOfWeek !== 0 ? DAY * currDayOfWeek : DAY * 7
    return formatDate(new Date(dow - cdow))
  })

  const [activeWeek, setActiveWeek] = useState([...initWeek])

  const weeks = useMemo(() => {
    const nextWeek = activeWeek.map((dayOfWeek, idx) => {
      const dow = new Date(dayOfWeek).getTime() + DAY * 7
      return formatDate(dow)
    })
    const prevWeek = activeWeek.map((dayOfWeek, idx) => {
      const dow = new Date(dayOfWeek).getTime() - +DAY * 7
      return formatDate(dow)
    })
    return {
      active: activeWeek,
      next: nextWeek,
      prev: prevWeek
    }
  }, [activeWeek])

  const activeMonth = useMemo(() => {
    const month = new Date(activeWeek[0]).getMonth()
    const year = new Date(activeWeek[0]).getFullYear()
    return `${MONTHS[month]} ${year}`
  }, [activeWeek])

  const next = () => {
    setActiveWeek(weeks.next)
  }
  const prev = () => {
    setActiveWeek(weeks.prev)
  }
  const onPress = (day) => {
    onSelectDay?.(day)
  }

  return (
    <View>
      <View className="mb-2 flex flex-row justify-between items-center">
        <Pressable
          // className={styles.buttonToday}
          onPress={() => {
            onPress(TODAY)
            setActiveWeek(initWeek)
          }}
        >
          <Text>Сегодня</Text>
        </Pressable>
        <Text className="font-bold">{activeMonth}</Text>
        <View className="flex flex-row gap-4">
          <Pressable
            // className={clsx(styles.buttonArrow, styles.arrowLeft)}
            onPress={prev}
          >
            <Text>prev</Text>
          </Pressable>
          <Pressable
            // className={clsx(styles.buttonArrow, styles.arrowRight)}
            onPress={next}
          >
            <Text>next</Text>
          </Pressable>
        </View>
      </View>
      <View className="border rounded">
        <View className="w-full text-center">
          <View>
            <View className="border-b border-stone-900 flex flex-row">
              {DAYS_OF_WEEK.map((DayOfWeek) => (
                <View
                  className="h-10 w-[14%] flex items-center justify-center"
                  key={DayOfWeek}
                >
                  <Text>{DayOfWeek}</Text>
                </View>
              ))}
            </View>
          </View>
          <View className="flex flex-row">
            {weeks.active.map((day, idx) => (
              <Pressable
                key={idx}
                // className="h-10 w-[14%] flex items-center justify-center"
                className={clsx(
                  'h-10 w-[14%] flex flex-row items-center justify-center'
                  // TODAY === day && TODAY !== activeDay && styles.today,
                )}
                onPress={() => onPress(day)}
              >
                <Text
                  className={clsx(
                    (idx === 5 || idx === 6) && 'text-red-500',
                    activeDay === day && 'text-purple-500'
                  )}
                >
                  {day.substring(3, 5)}
                </Text>
                {events?.includes(day) && <Text>*</Text>}
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

CalendarWeek.defaultProps = {
  activeDay: TODAY,
  onSelectDay: (day) => {
    console.log('day:', day)
  }
}

export default CalendarWeek
