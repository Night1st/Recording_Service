import { useGetAllDepartment } from '@/shared/schemas/models/IDepartment.model'
import InputSelect from '../common/form/InputSelect'

type Props = {
    fieldName: string
    form: any
    label?: string
    placeHolder?: string
    handleOnchange?: (value:any) => void
}

export default function InputSelectDepartment(props: Props) {
    const data = useGetAllDepartment()
    return (
        <InputSelect fieldName={props.fieldName || 'department'} form={props.form} label={props.label} placeHolder={props.placeHolder || 'Chọn department'}
            options={data.data?.map(item => ({ value: item.id, label: item.name }))} handleOnchange={props.handleOnchange}
        />
    )
}