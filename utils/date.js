export const DAY = 1000 * 60 * 60 * 24
export const DATE_LOCALE = 'en-US'
const DATE_OPTIONS = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}
export const formatDate = (date) => {
  return new Date(new Date(date)).toLocaleDateString(DATE_LOCALE, DATE_OPTIONS)
}
export const TODAY = formatDate(new Date())
export const PREW_DAY = formatDate(new Date().getTime() - DAY)
