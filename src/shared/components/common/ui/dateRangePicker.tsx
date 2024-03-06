import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format, subDays } from "date-fns"
import { DateRange } from "react-day-picker"


import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"
import { Button } from "./button"
import { cn } from "@/shared/utils/tailwind/functions"
import { Calendar } from "./calendar"

type Props = {
    className?: React.HTMLAttributes<HTMLDivElement>,
    dates?: { from: Date, to: Date },
    handleSelect?: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({ className, dates, handleSelect }: Props) {
    const [date, setDate] = React.useState<DateRange | undefined>(dates || {
        from: subDays(new Date(), 7),
        to: new Date(),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd LLL, y")} -{" "}
                                    {format(date.to, "dd LLL, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(dates) => {
                            setDate(dates)
                            if (handleSelect) handleSelect(dates)
                        }
                        }
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
