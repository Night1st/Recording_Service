import { useGetAllJobposition } from '@/shared/schemas/models/IJobPosition'
import InputSelect from '../common/form/InputSelect'
import { useEffect } from 'react'

type Props = {
    fieldName: string
    form: any
    label?: string
    placeHolder?: string
}

export default function InputSelectJobPosition(props: Props) {
    const data = useGetAllJobposition()
    // useEffect(()=>{
    //     props.form.resetField(props.fieldName)
    // },[props.departId])
    return (
        <InputSelect fieldName={props.fieldName || 'jobPositionId'} form={props.form} label={props.label} placeHolder={props.placeHolder || 'Chọn Job Position'}
            options={data.data?.map(item => ({ value: item.id, label: item.name })) || []}
        />
    )
}