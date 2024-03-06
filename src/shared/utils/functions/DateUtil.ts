import dayjs, { Dayjs } from "dayjs";
import weekday from 'dayjs/plugin/weekday'


/**
 * 
 * @param indexOfDay if monday is the first day of week 
 * -> findNextDay(-7) return last Monday
 * > findNextDay(7) return next Monday
 * @returns 
 */
export function findNextDay(indexOfDay: number) {
    dayjs.extend(weekday)
    return dayjs().weekday(indexOfDay)
}

export function getDatesBetween(startDate: Dayjs, endDate: Dayjs) {
    const dates = [];
    let currentDate = startDate.startOf('day');
    const lastDate = endDate.startOf('day');

    while (currentDate.isBefore(lastDate) || currentDate.isSame(lastDate)) {
        dates.push(currentDate);
        currentDate = currentDate.add(1, 'day');
    }

    return dates;
}