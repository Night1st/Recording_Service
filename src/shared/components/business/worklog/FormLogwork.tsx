import InputText from '@/shared/components/common/form/InputText';
import { Form } from '@/shared/components/common/ui/form';
import { IWorkLog } from '@/shared/schemas/models/IWorkLog.model';
import { isLaterThan } from '@/shared/utils/functions/compareTime';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MoveLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputDatePicker from '../../common/form/InputDatePicker';
import InputTextArea from '../../common/form/InputTextArea';
import { Button } from '../../common/ui/button';
import InputSelectProject, { InputSelectProjectByUserId } from '../InputSelectProject';
import InputSelectPhase from '../InputSelectPhase';
import InputSelect from '../../common/form/InputSelect';
import dayjs from 'dayjs';
import { IProjectUser, useGetAllProject, useGetAllProjectByUserId } from '@/shared/schemas/models/IProject.model';
import { useGetInfoByToken } from '@/shared/schemas/models/IUser.model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Content } from 'next/font/google';
import { useRouter } from 'next/router';

type Props = {
    onSubmit: (value: Partial<IWorkLog>) => void;
    isLoading?: boolean;
    defaultValue?: Partial<IWorkLog>;
    onBack?: () => void;
};
const formSchema = z.object({
    projectCode: z.string({ required_error: 'Vui lòng chọn phòng dự án' }),
    phasesId: z.number({ required_error: 'Vui lòng chọn giai đoạn của dự án' }),
    description: z.string().optional(),
    task: z.string({ required_error: 'Vui lòng điền tên công việc' }),
    date: z.any({ required_error: 'Vui lòng chọn ngày làm việc' }),
    from: z.string({ required_error: 'Vui lòng chọn thời gian làm việc' }),
    to: z.string({ required_error: 'Vui lòng chọn thời gian kết thúc làm việc' }),
});
export default function FormLogWork({ onSubmit, isLoading, defaultValue, onBack }: Props) {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: router.query['date'] ? dayjs(router.query['date'] as string).toDate() : dayjs().toDate()
        },
    });
    useEffect(() => {
        if (defaultValue) {
            for (const [key, value] of Object.entries(defaultValue)) {
                form.setValue(key as any, value, {
                    shouldValidate: true,
                    shouldDirty: true,
                });
            }
        }
    }, [defaultValue]);
    const fromTime = form.watch('from');
    const toTime = form.watch('to');
    useEffect(() => {
        if (isLaterThan(fromTime, toTime)) {
            form.setError('from', { message: 'Thời gian bắt đầu muộn hơn thời gian kết thúc' });
        } else {
            form.clearErrors('from');
        }
    }, [fromTime, toTime]);
   
    const optionTime = Array.from(Array(48).keys()).map(item => ({
        value: dayjs()
            .startOf('day')
            .add(item * 30, 'minutes').format('HH:mm'),
        label: dayjs()
            .startOf('day')
            .add(item * 30, 'minutes')
            .format('HH:mm'),
    }));
    const { data: listProj } = useGetAllProject()
    const projectId = listProj?.find(proj => proj.projectCode === form.watch('projectCode'))?.id
    const user = useAppSelector(state => state.appSlice.user)
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onError={e => {
                    console.log(e);
                }}
                className='space-y-4'
            >
                <InputSelectProjectByUserId fieldName='projectCode' form={form} label='Lựa chọn Project' placeHolder='Chọn project' userId={user?.id} />
                <InputSelectPhase
                    projectId={projectId}
                    mode='single'
                    fieldName='phasesId'
                    form={form}
                    label='Lựa chọn Phase'
                    placeHolder='Chọn phase'
                />
                <InputTextArea form={form} fieldName='task' label='Công việc' />
                <InputTextArea form={form} fieldName='description' label='Mô tả' />
                <InputDatePicker fieldName='date' form={form} label='Ngày' />
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 '>
                    <InputSelect form={form} fieldName='from' label='Bắt đầu' options={optionTime} />
                    <InputSelect form={form} fieldName='to' label='Kết thúc' options={optionTime} />
                </div>

                <div className='flex justify-start gap-4'>
                    <Button type='reset' onClick={() => onBack && onBack()} variant={'outline'}>
                        {' '}
                        <MoveLeft className='mr-2 h-4 w-4 ' /> Hủy
                    </Button>
                    <Button type='submit'> {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Lưu</Button>
                </div>
            </form>
        </Form>
    );
}
