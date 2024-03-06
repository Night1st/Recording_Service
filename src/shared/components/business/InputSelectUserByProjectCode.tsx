import { useGetAllJobposition, useGetAllJobpositionByDepartId } from '@/shared/schemas/models/IJobPosition'
import InputSelect from '../common/form/InputSelect'
import { useEffect } from 'react'
import { useGetAllUserByProjectId } from '@/shared/schemas/models/IUser.model'

type Props = {
    fieldName: string
    form: any
    label?: string
    placeHolder?: string
    projectCode: string|null
    handleOnChange?: (value: any) => void

}

export default function InputSelectUserByProjectCode(props: Props) {
    const { data } = useGetAllUserByProjectId({ id: props.projectCode!, options: { enabled: !!props.projectCode } })

    return (
        <InputSelect fieldName={props.fieldName || 'userId'} form={props.form} label={props.label}
            placeHolder={props.placeHolder || 'Chọn nhân sự'}
            options={data?.map(item => ({ value: item.id, label: item.fullName })) || []}
            handleOnchange={props.handleOnChange}
        />
    )
}