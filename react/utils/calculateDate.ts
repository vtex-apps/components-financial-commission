const now = new Date()

export const getDateString = (date: Date) => {
  console.info('dateeeeeeeeeeee ', date)
  const month = date.getMonth() + 1
  const monthString = month <= 9 ? `0${month}` : month
  const day = date.getDate()
  const dayString = day <= 9 ? `0${day}` : day

  return `${date.getFullYear()}-${monthString}-${dayString}`
}

export const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
now.setDate(now.getDate() - 1)
export const yesterday = now
