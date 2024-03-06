import { compareAsc, parse } from "date-fns";

/**
 * 
 * @param timeStr1 thời gian cần so sánh 
 * @param timeStr2 thời gian cần so sánh
 * @returns true if timeStr1 equal or later than timeStr2 else return false
 */
export function isLaterThan(timeStr1: string, timeStr2: string) {
    if (!timeStr1 || !timeStr2) return false
    const time1 = parse(timeStr1, 'HH:mm', new Date());
    const time2 = parse(timeStr2, 'HH:mm', new Date());
    const comparison = compareAsc(time1, time2);
    if (comparison === -1) return false
    else return true

}