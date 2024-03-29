import React, { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from '@/shared/utils/tailwind/functions'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { unionBy } from 'lodash-es'
import { stringToSlug } from '@/shared/utils/functions/stringUtil'

/* TODO : filter theo label hoac value */
type Props = {
    form: any
    fieldName: string
    label?: string
    placeHolder?: string
    options?: { value: any, label: string }[]
    handleOnchange?: (value: any) => void
    // defaultValue? : any
}

export default function InputSelect({ form, label, placeHolder, fieldName, options = [], handleOnchange }: Props) {
    const [open, setOpen] = useState(false)
    const [searchText, setSearchText] = useState<string>()
    const filtedOptions = options.filter(item => {
        if (!searchText) return true
        return item.label.toLowerCase().includes(searchText.toLowerCase())
    })
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel className='capitalize text-base'>{label}:</FormLabel>}
                    <Popover open={open} onOpenChange={() => setOpen(!open)}>
                        <PopoverTrigger asChild >
                            <FormControl>
                                <Button
                                    size='lg'
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between px-3 group",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    <div className='flex gap-2 items-center'>
                                        {field.value
                                            ? options?.find((op) => op.value === field.value)?.label
                                            : placeHolder}
                                        {!!field.value && <X size={14} className='opacity-70 hidden group-hover:block transition-all' onClick={() => {
                                            if (handleOnchange) handleOnchange(undefined)
                                            form.resetField(fieldName)
                                        }
                                        } />}
                                    </div>

                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align='start' >
                            <Command shouldFilter={false}>
                                <CommandInput placeholder={placeHolder} onValueChange={(value) => setSearchText(value)} />
                                <CommandEmpty >
                                    Not found...
                                </CommandEmpty>
                                <CommandGroup className='max-h-[300px] overflow-y-auto'>
                                    {unionBy(filtedOptions, 'value')?.map((op) => (
                                        <CommandItem
                                            value={op.value}
                                            key={op.value}
                                            onSelect={(value) => {
                                                form.setValue(fieldName, op.value)
                                                form.clearErrors(fieldName)
                                                setOpen(!open)
                                                if (handleOnchange) handleOnchange(op.value)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    op.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {op.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )
            }
        />
    )
}