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

export function ConvertDateTime(date: string) {
  const originalDate = new Date(date)
  const day = originalDate.getDate()
  const month = originalDate.getMonth() + 1
  const year = originalDate.getFullYear()
  const formattedDateString = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year
    .toString()
    .padStart(4, '0')}`
  return formattedDateString
}
