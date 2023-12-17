export function getStartAndEndWeek(year: number, month: number, day: number) {
  const date = new Date(year, month - 1, day) // Месяцы в JavaScript начинаются с 0

  // Получение первой секунды понедельника
  const weekStart = new Date(date)
  weekStart.setDate(
    date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
  ) // Если текущий день воскресенье, то начинаем с предыдущего понедельника
  weekStart.setHours(0, 0, 0, 0) // Установка времени на начало дня

  // Получение последней секунды воскресенья
  const weekEnd = new Date(date)
  weekEnd.setDate(date.getDate() - date.getDay() + 7) // Последний день недели (воскресенье)
  weekEnd.setHours(23, 59, 59, 999) // Установка времени на конец дня

  return {
    startWeekTSt: weekStart.getTime(),
  }
}
