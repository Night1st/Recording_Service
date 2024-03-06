import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { Textarea } from '../ui/textarea'

type Props = {
    form: any
    fieldName: string
    label?: string
    placeHolder?: string
    size?: number
}

export default function InputTextArea({ fieldName, form, label, placeHolder, size }: Props) {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel className='capitalize text-base'>{label}:</FormLabel>}
                    <FormControl>
                        <Textarea
                            rows={size}
                            className="resize-y"
                            placeholder={placeHolder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}