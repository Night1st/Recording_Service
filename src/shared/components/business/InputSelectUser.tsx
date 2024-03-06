import React from 'react'
import InputSelect from '../common/form/InputSelect'
import { useGetAllUser, useGetAllUserByDepartmentId } from '@/shared/schemas/models/IUser.model'
import { useAppSelector } from '@/shared/hooks/useRedux'

type Props = {
  fieldName: string
  form: any
  label?: string
  departmentId?: React.Key
  placeHolder?: string
  handleOnChange?: (value: any) => void
}

export default function InputSelectUser(props: Props) {
  const data = useGetAllUser();
  function displayUserInfo(name: string | undefined, job: string | undefined, department: string | undefined) {
    return [name, job, department].filter(item => item).join(' - ');
  }
  return (
    <InputSelect
      fieldName={props.fieldName || 'user'}
      form={props.form}
      label={props.label}
      placeHolder={props.placeHolder || 'Chọn user'}
      handleOnchange={props.handleOnChange}
      options={data.data?.map(item => ({
        value: item.id,
        label: displayUserInfo(item.fullName, item.jobPosition?.name, item.department?.name),
      }))}
    />
  );
}

export function InputSelectUserByDepartment(props: Props) {
  const data = useGetAllUserByDepartmentId({ id: props.departmentId!, options: { enabled: !!props.departmentId } })
  return (
    <InputSelect fieldName={props.fieldName || 'user'} form={props.form} label={props.label} placeHolder={props.placeHolder || 'Chọn user'}
      options={data.data?.map(item => ({ value: item.id, label: `${item.fullName}` }))}
      handleOnchange={props.handleOnChange}
    />
  )
}