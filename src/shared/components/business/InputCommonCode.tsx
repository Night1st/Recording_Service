import { useGetAllCommonCodeByLevel } from '@/shared/schemas/models/ICommonCode'
import InputSelect from '../common/form/InputSelect'
import { useEffect } from 'react'

type Props = {
    fieldName: string
    form: any
    label?: string
    placeHolder?: string
}

export default function InputSelectCommonCode(props: Props) {
    const data = useGetAllCommonCodeByLevel()
    // useEffect(()=>{
    //     props.form.resetField(props.fieldName)
    // },[props.departId])
    return (
        <InputSelect fieldName={props.fieldName || 'commonCodeType'} form={props.form} label={props.label} placeHolder={props.placeHolder || 'Chọn Level'}
            options={data.data?.map(item => ({ value: item.id, label: item.value })) || []}
        />
    )
}