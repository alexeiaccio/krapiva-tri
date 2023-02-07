import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export function parseDate(date: unknown): string {
  if (!date || typeof date !== 'string') {
    return format(new Date(), 'yyyy-MM-dd')
  }

  return format(parseISO(date), 'yyyy-MM-dd')
}

export function parseLocalDate(date: string): string {
  return format(parseISO(date), 'dd MMMM yyyy', { locale: ru })
}
