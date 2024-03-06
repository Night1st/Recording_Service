import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

type Props = {
    form: any
    fieldName: string
    label?: string
    placeHolder?: string
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    description?: string
}

export default function InputText({ fieldName, form, label, placeHolder, inputProps, description }: Props) {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem >
                    {label && <FormLabel className='capitalize text-base'>{label}:</FormLabel>}
                    <FormControl>
                        <Input placeholder={placeHolder} {...field} {...inputProps} />
                    </FormControl>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}