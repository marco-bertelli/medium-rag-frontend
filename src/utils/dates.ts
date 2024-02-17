import { DateTime } from 'luxon'

export const formattedTs = (ts: string) => {
  return DateTime.fromISO(ts).toFormat('EEE, MMM dd, HH:mm', { locale: 'it' })
}
