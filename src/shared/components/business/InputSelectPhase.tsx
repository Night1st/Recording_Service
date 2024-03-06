import { useGetAllPhase, useGetAllPhaseByProjectId } from '@/shared/schemas/models/IPhase.model'
import { InputMultiSelect } from '../common/form/InputMultiSelect'
import InputSelect from '../common/form/InputSelect'

type Props = {
    fieldName: string
    form: any
    label?: string
    placeHolder?: string
    mode: 'multip' | 'single',
    projectId?: React.Key,
}

export default function InputSelectPhase(props: Props) {
    const data = useGetAllPhaseByProjectId({ id: props.projectId!, options: { enabled: !!props.projectId } })
    if (props.mode === 'multip') {
        return (
            <InputMultiSelect form={props.form} fieldName={props.fieldName} label={props.label} placeHolder={props.placeHolder} options={data.data?.map(item => ({ value: item.phasesId, label: item.phaseName })) || []} />
        )
    }
    else {
        return (
            <InputSelect form={props.form} fieldName={props.fieldName} label={props.label} placeHolder={props.placeHolder} options={data.data?.map(item => ({ value: item.phasesId, label: item.phaseName })) || []} />
        )
    }
}