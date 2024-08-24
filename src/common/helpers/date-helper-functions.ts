export function setHoursTo0(date: Date): Date {
	const normalizedDate = (new Date(date) || new Date()).setHours(0, 0, 0, 0)
	return new Date(normalizedDate)
}

export function nextDay(date: Date): Date {
	const normalizedDate = (new Date(date) || new Date()).setHours(0, 0, 0, 0)
	const nextDay = new Date(new Date(normalizedDate).setDate(new Date(normalizedDate).getDate() + 1))
	return nextDay
}
