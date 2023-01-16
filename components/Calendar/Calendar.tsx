import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectHabit, setActiveDay } from '../../store/reducers/habit/habit'
import CalendarMonth from './CalendarMonth'
import CalendarWeek from './CalendarWeek'
import { selectSettings } from '../../store/reducers/settings/settings'
import { IHabit } from '../../Models/type.habit'

const Calendar = () => {
  const { list, today, activeDay } = useSelector(selectHabit)
  const { calendarType } = useSelector(selectSettings)
  const dispatch = useDispatch()

  const calendarValues = useMemo(() => {
    const dates = new Set<string>()
    Object.values(list).forEach((habit: IHabit) => {
      habit.progress.forEach((date) => {
        dates.add(date)
      })
    })

    return Array.from(dates)
  }, [list])

  const onSelectDay = (day: string) => {
    dispatch(setActiveDay(day))
  }

  return (
    <div className="w-full">
      {calendarType === 'month' ? (
        <CalendarMonth
          onSelectDay={onSelectDay}
          activeDay={activeDay}
          events={calendarValues}
        />
      ) : (
        <CalendarWeek
          onSelectDay={onSelectDay}
          activeDay={activeDay}
          events={calendarValues}
        />
      )}
    </div>
  )
}

export default Calendar
