import React from 'react'
import InputSelect from '../common/form/InputSelect'
import { useGetAllProject, useGetAllProjectByUserId } from '@/shared/schemas/models/IProject.model'

type Props = {
    fieldName: string
    form: any
    label?: string
    placeHolder?: string
    userId?: React.Key
    handleOnChange?: (value:any) => void
}

export default function InputSelectProject(props: Props) {
    const data = useGetAllProject()
    return (
        <InputSelect fieldName={props.fieldName || 'project'} form={props.form} label={props.label} placeHolder={props.placeHolder || 'Chọn project'}
            options={data.data?.map(item => ({ value: item.projectCode, label: item.projectCode }))} handleOnchange={props.handleOnChange}
        />
    )
}

export function InputSelectProjectByUserId(props: Props) {
    const data = useGetAllProjectByUserId({ id: props.userId!, options: { enabled: !!props.userId } })
    return (
        <InputSelect fieldName={props.fieldName || 'project'} form={props.form} label={props.label} placeHolder={props.placeHolder || 'Chọn project'}
            options={data.data?.map(item => ({ value: item.projectCode, label: item.projectCode }))} handleOnchange={props.handleOnChange}
        />
    )
}