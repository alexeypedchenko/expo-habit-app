import React, { FC, useMemo, useState } from 'react'
import clsx from 'clsx'
import { formatDate, TODAY } from '../../utils/date'
import { DAYS_OF_WEEK, MONTHS } from './utils'
import styles from './Calendar.module.css'

const DATE = new Date()
//Устанавливаем текущий месяц, год
const CURRENT_DAY = DATE.getDate()
const CURRENT_MONTH = DATE.getMonth()
const CURRENT_YEAR = DATE.getFullYear()

type Props = {
  activeDay?: string
  events?: string[]
  onSelectDay?: (day: string) => void
}

const CalendarMonth: FC<Props> = ({ activeDay, events, onSelectDay }) => {
  const [activeMonth, setActiveMonth] = useState(DATE.getMonth())
  const [activeYear, setActiveYear] = useState(DATE.getFullYear())

  const activeMonthTitle = MONTHS[activeMonth]

  // Первый день недели в выбранном месяце
  const firstDayOfMonth = new Date(activeYear, activeMonth, 7).getDay()
  // Последний день выбранного месяца
  const lastDateOfMonth = new Date(activeYear, activeMonth + 1, 0).getDate()
  // Последний день предыдущего месяца
  const lastDayOfLastMonth =
    activeMonth === 0
      ? new Date(activeYear - 1, 11, 0).getDate()
      : new Date(activeYear, activeMonth, 0).getDate()

  const daysOfMonth = useMemo(() => {
    const arr: any = []
    // Записываем дни
    let i = 1
    let newArr = []
    do {
      let dayOfWeek = new Date(activeYear, activeMonth, i).getDay()
      // Если первый день недели не понедельник показать последние дни предыдущего месяца
      if (i === 1) {
        let k = lastDayOfLastMonth - firstDayOfMonth + 1
        for (let j = 0; j < firstDayOfMonth; j++) {
          newArr.push({
            type: 'not-current',
            date: '', // formatDate(new Date(activeYear, activeMonth, k)),
            day: k,
          })
          k++
        }
      }
      // Записываем текущий день в цикл
      const chk = new Date()
      const chD = chk.getDate()
      const chkM = chk.getMonth()
      const chkY = chk.getFullYear()
      if (chkY === activeYear && chkM === activeMonth && i === chD) {
        newArr.push({
          type: 'today',
          date: formatDate(new Date(activeYear, activeMonth, i)),
          day: i,
        })
      } else {
        newArr.push({
          type: 'normal',
          date: formatDate(new Date(activeYear, activeMonth, i)),
          day: i,
        })
      }
      // закрыть строку в воскресенье
      if (dayOfWeek === 0) {
        arr.push(newArr)
        newArr = []
      }
      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if (i === lastDateOfMonth) {
        let k = 1
        for (dayOfWeek; dayOfWeek < 7; dayOfWeek++) {
          newArr.push({
            type: 'not-current',
            date: '', // formatDate(new Date(activeYear, activeMonth, k)),
            day: k,
          })
          k++
        }
        arr.push(newArr)
      }
      i++
    } while (i <= lastDateOfMonth)
    // Конец таблицы
    return arr
  }, [
    firstDayOfMonth,
    lastDateOfMonth,
    lastDayOfLastMonth,
    activeYear,
    activeMonth,
    CURRENT_DAY,
  ])

  const nextMonth = () => {
    // if (new Date().getMonth() ==== activeMonth) {
    //   return
    // }

    if (activeMonth === 11) {
      setActiveMonth(0)
      setActiveYear(activeYear + 1)
    } else {
      setActiveMonth(activeMonth + 1)
    }
  }
  // Переход к предыдущему месяцу
  const previousMonth = () => {
    if (activeMonth === 0) {
      setActiveMonth(11)
      setActiveYear(activeYear - 1)
    } else {
      setActiveMonth(activeMonth - 1)
    }
  }

  const onClickToday = () => {
    onSelectDay?.(TODAY)
    setActiveMonth(CURRENT_MONTH)
    setActiveYear(CURRENT_YEAR)
  }

  return (
    <div>
      <div className="mb-2 flex w-full justify-between">
        <button className={styles.buttonToday} onClick={onClickToday}>
          Сегодня
        </button>
        <h2 className="font-bold">
          {activeMonthTitle} {activeYear}
        </h2>
        <div className="flex gap-2">
          <button
            className={clsx(styles.buttonArrow, styles.arrowLeft)}
            onClick={previousMonth}
          ></button>
          <button
            className={clsx(styles.buttonArrow, styles.arrowRight)}
            onClick={nextMonth}
          ></button>
        </div>
      </div>
      <div className="bg-stone-800 rounded">
        <table className="w-full text-center">
          <thead>
            <tr className="border-b border-stone-900">
              {DAYS_OF_WEEK.map((DayOfWeek) => (
                <th
                  className="h-10"
                  key={DayOfWeek}
                  style={{ width: 'calc(100% / 7)' }}
                >
                  {DayOfWeek}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfMonth.map((tr: any, i: number) => (
              <tr key={i}>
                {tr.map((td: any, idx: number) => (
                  <td
                    key={idx}
                    className={clsx(
                      styles.date,
                      TODAY === td.date && TODAY !== activeDay && styles.today,
                      activeDay === td.date && styles.activeDay,
                      (idx === 5 || idx === 6) && styles.weekend,
                      td.type === 'not-current' && styles.buttonDisabled
                    )}
                    onClick={() => onSelectDay?.(td.date)}
                  >
                    {td.day}
                    {events?.includes(td.date) && <span>*</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

CalendarMonth.defaultProps = {
  activeDay: TODAY,
  onSelectDay: (day: string) => {
    console.log('day:', day)
  },
}

export default CalendarMonth
