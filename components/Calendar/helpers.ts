export class CalendarClass {
  container: any
  DaysOfWeek: any
  Months: any
  currMonth: any
  currYear: any
  currDay: any

  constructor(divId: string) {
    //Сохраняем идентификатор div
    this.container = document.getElementById(divId)
    // Дни недели с понедельника
    this.DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Су', 'Вс']
    // Месяцы начиная с января
    this.Months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ]
    //Устанавливаем текущий месяц, год
    var d = new Date()
    this.currMonth = d.getMonth()
    this.currYear = d.getFullYear()
    this.currDay = d.getDate()
  }
  // Переход к следующему месяцу
  nextMonth() {
    // if (new Date().getMonth() === this.currMonth) {
    //   return
    // }

    if (this.currMonth == 11) {
      this.currMonth = 0
      this.currYear = this.currYear + 1
    } else {
      this.currMonth = this.currMonth + 1
    }
    this.showcurr()
  }
  // Переход к предыдущему месяцу
  previousMonth() {
    if (this.currMonth == 0) {
      this.currMonth = 11
      this.currYear = this.currYear - 1
    } else {
      this.currMonth = this.currMonth - 1
    }
    this.showcurr()
  }
  // Показать текущий месяц
  showcurr() {
    this.showMonth(this.currYear, this.currMonth)
  }
  // Показать месяц (год, месяц)
  showMonth(y: any, m: any) {
    var d = new Date(),
      // Первый день недели в выбранном месяце
      firstDayOfMonth = new Date(y, m, 7).getDay(),
      // Последний день выбранного месяца
      lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
      // Последний день предыдущего месяца
      lastDayOfLastMonth =
        m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate()
    var html = '<table class="w-full text-center">'
    // Запись выбранного месяца и года
    html += `
      <thead>
        <tr>
          <td><button id="calPrevMonth">prev</button></td>
          <td colspan="7">${this.Months[m]} ${y}</td>
          <td><button id="calNextMonth">next</button></td>
        </tr>
      </thead>
    `
    // заголовок дней недели
    html += `
    <tr class="days">
      ${this.DaysOfWeek.map((DayOfWeek: any) => `<td>${DayOfWeek}</td>`).join(
        ''
      )}
    </tr>
    `
    // Записываем дни
    var i = 1
    do {
      var dow = new Date(y, m, i).getDay()
      // Начать новую строку в понедельник
      if (dow == 1) {
        html += '<tr>'
      }
      // Если первый день недели не понедельник показать последние дни предыдущего месяца
      else if (i == 1) {
        html += '<tr>'
        var k = lastDayOfLastMonth - firstDayOfMonth + 1
        for (var j = 0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + '</td>'
          k++
        }
      }
      // Записываем текущий день в цикл
      var chk = new Date()
      var chkY = chk.getFullYear()
      var chkM = chk.getMonth()
      if (
        chkY == this.currYear &&
        chkM == this.currMonth &&
        i == this.currDay
      ) {
        html += '<td class="today bg-purple-500 rounded-2xl">' + i + '</td>'
      } else {
        html += '<td class="normal">' + i + '</td>'
      }
      // закрыть строку в воскресенье
      if (dow == 0) {
        html += '</tr>'
      }
      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if (i == lastDateOfMonth) {
        var k = 1
        for (dow; dow < 7; dow++) {
          html += '<td class="not-current">' + k + '</td>'
          k++
        }
      }
      i++
    } while (i <= lastDateOfMonth)
    // Конец таблицы
    html += '</table>'
    // Записываем HTML в div
    this.container.innerHTML = html
    this.setButtonListeners()
  }

  setButtonListeners() {
    if (this.container) {
      const prevBtn = this.container.querySelector('#calPrevMonth')
      const nextBtn = this.container.querySelector('#calNextMonth')
      prevBtn.addEventListener('click', () => this.previousMonth())
      nextBtn.addEventListener('click', () => this.nextMonth())
    }
  }
}
