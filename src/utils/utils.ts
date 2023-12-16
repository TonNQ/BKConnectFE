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
  if (hours == 0) {
    return `12:${minutes.toString().padStart(2, '0')} AM`
  }
  if (hours < 12) {
    return `${hours}:${minutes.toString().padStart(2, '0')} AM`
  } else if (hours == 12) {
    return `12:${minutes.toString().padStart(2, '0')} PM`
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

// Tính khoảng cách thời gian (đơn vị ms)
export function TimeDifference(date1: string, date2: string) {
  const time1: Date = new Date(date1)
  const time2: Date = new Date(date2)
  return Math.abs(time1.getTime() - time2.getTime())
}

// Trả về dạng "1 phút trước", "1 giờ trước", "1 ngày trước", ...
export function ShowTimeDifference(date: string, onlyTime: boolean) {
  const time1: Date = new Date()
  const time2: Date = new Date(date)
  const diff: number = time1.getTime() - time2.getTime()
  const minutes: number = Math.floor(diff / (1000 * 60))
  const hours: number = Math.floor(diff / (1000 * 60 * 60))
  const days: number = Math.floor(diff / (1000 * 60 * 60 * 24))
  const weeks: number = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
  const months: number = Math.floor(diff / (1000 * 60 * 60 * 24 * 4))
  if (onlyTime) {
    if (minutes == 0) {
      return 'vài giây trước'
    } else if (minutes < 60) {
      return `${minutes} phút trước`
    } else if (hours < 24) {
      return `${hours} giờ trước`
    } else if (days < 7) {
      return `${days} ngày trước`
    } else if (weeks < 4) {
      return `${weeks} tuần trước`
    } else if (months < 12) {
      return `${months} tháng trước`
    } else {
      return ''
    }
  } else {
    if (minutes == 0) {
      return 'Đang hoạt động'
    } else if (minutes < 60) {
      return `Hoạt động ${minutes} phút trước`
    } else if (hours < 24) {
      return `Hoạt động ${hours} giờ trước`
    } else if (days < 7) {
      return `Hoạt động ${days} ngày trước`
    } else if (weeks < 4) {
      return `Hoạt động ${weeks} tuần trước`
    } else if (months < 12) {
      return `Hoạt động ${months} tháng trước`
    } else {
      return ''
    }
  }
}

// Chuyển sang DateTime C#
export function convertToDateTimeServer(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const milliseconds = String(date.getMilliseconds()).padStart(7, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`
}

// Lấy thời gian hiện tại theo múi giờ của trình duyệt
export function getDateTimeNow() {
  const date = new Date()
  // Lấy múi giờ hiện tại của trình duyệt
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  // Chuyển múi giờ của đối tượng Date theo múi giờ hiện tại của trình duyệt
  return date.toLocaleString('en-US', { timeZone: browserTimeZone })
}
