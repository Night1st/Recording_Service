import { useGetAllJobposition, useGetAllJobpositionByDepartId } from '@/shared/schemas/models/IJobPosition'
import InputSelect from '../common/form/InputSelect'
import { useEffect } from 'react'

type Props = {
    fieldName: string
    form: any
    label?: string
    placeHolder?: string
    departmentId: number
}

export default function InputSelectJobPositionByDepartmentId(props: Props) {
    const {data} = useGetAllJobpositionByDepartId({ id: props.departmentId })
    
    return (
        <InputSelect fieldName={props.fieldName || 'jobPositionId'} form={props.form} label={props.label} placeHolder={props.placeHolder || 'Chọn Job Position'}
        options={data?.map(item => ({ value: item.id, label: item.name })) || []}
        />
    )
}