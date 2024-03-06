import { TIME_FORMAT_READ } from '@/Settings'
import { cn } from '@/shared/utils/tailwind/functions'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { CalendarIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Calendar, CalendarProps } from '../ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

dayjs.extend(utc)
dayjs.extend(timezone)

type Props = {
    form: any
    fieldName: string
    label?: string
    placeHolder?: string
    calendarProps?: CalendarProps
    handleOnChange?: (value: any) => void
}

export default function InputDatePicker({ fieldName, form, label, placeHolder, calendarProps, handleOnChange }: Props) {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className='w-full'>
                    <FormLabel className="block capitalize text-base">{label}: </FormLabel>
                    <Popover >
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    size={'lg'}
                                    variant={"outline"}
                                    className={cn(
                                        "p-3 text-left font-normal w-full",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        dayjs(field.value).tz('Asia/Bangkok').format(TIME_FORMAT_READ)
                                    ) : (
                                        <span>{placeHolder} </span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={dayjs(field.value).toDate()}
                                //@ts-ignore
                                onSelect={e => {
                                    if (handleOnChange) {
                                        handleOnChange(e)
                                    }
                                    field.onChange(e)
                                }}

                                initialFocus
                                {...calendarProps}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}