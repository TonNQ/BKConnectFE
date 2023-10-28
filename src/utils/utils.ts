import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosBadRequest<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

function ConvertTime(hours: number, minutes: number) {
  if (hours < 12) {
    return `${hours}:${minutes.toString().padStart(2, '0')} AM`
  } else {
    return `${hours - 12}:${minutes.toString().padStart(2, '0')} PM`
  }
}

// Chuyển sang dạng: dd/mm/yyyy
export function ConvertDMY(date: string) {
  const originalDate = new Date(date)
  const day = originalDate.getDate()
  const month = originalDate.getMonth() + 1
  const year = originalDate.getFullYear()
  const formattedDateString = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year
    .toString()
    .padStart(4, '0')}`
  return formattedDateString
}

// Chuyển sang dạng: yyyy-mm-dd
export function ConvertYMD(date: string) {
  const originalDate = new Date(date)
  const day = originalDate.getDate()
  const month = originalDate.getMonth() + 1
  const year = originalDate.getFullYear()
  const formattedDateString = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`
  return formattedDateString
}

function areDatesInSameWeek(date1: Date, date2: Date): boolean {
  // Lấy số ngày hiện tại trong tuần
  const dayOfWeek1 = date1.getDay()
  const dayOfWeek2 = date2.getDay()

  // Lấy ngày đầu tiên trong tuần của mỗi date
  const firstDayOfWeek1 = new Date(date1)
  firstDayOfWeek1.setDate(date1.getDate() - dayOfWeek1)

  const firstDayOfWeek2 = new Date(date2)
  firstDayOfWeek2.setDate(date2.getDate() - dayOfWeek2)

  // So sánh số tuần và năm của hai ngày
  return (
    firstDayOfWeek1.getFullYear() === firstDayOfWeek2.getFullYear() &&
    firstDayOfWeek1.getMonth() === firstDayOfWeek2.getMonth() &&
    firstDayOfWeek1.getDate() === firstDayOfWeek2.getDate()
  )
}

// Chuyển sang dạng: HH/mm AM/PM nếu trong 1 ngày, thứ nếu trong tuần
// ngày dạng Jan 1,... nếu trong năm, nếu khác năm thì gọi hàm ConvertDMY
export function ConvertDateTime(date: string, showTime: boolean) {
  const originalDate = new Date(date)
  const dateNow = new Date()
  const day = originalDate.getDate()
  const month = originalDate.getMonth() + 1
  const year = originalDate.getFullYear()
  const hours = originalDate.getHours()
  const minutes = originalDate.getMinutes()
  const dayNow = dateNow.getDate()
  const yearNow = dateNow.getFullYear()
  if (day === dayNow) {
    return ConvertTime(hours, minutes)
  }
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  if (areDatesInSameWeek(originalDate, dateNow)) {
    return showTime
      ? daysOfWeek[originalDate.getDay()] + ' ' + ConvertTime(hours, minutes)
      : daysOfWeek[originalDate.getDay()]
  } else {
    if (year === yearNow) {
      const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return showTime
        ? `${monthsOfYear[month - 1]} ${day}` + ' ' + ConvertTime(hours, minutes)
        : `${monthsOfYear[month - 1]} ${day}`
    } else {
      return showTime ? ConvertDMY(date) + ' ' + ConvertTime(hours, minutes) : ConvertDMY(date)
    }
  }
}
