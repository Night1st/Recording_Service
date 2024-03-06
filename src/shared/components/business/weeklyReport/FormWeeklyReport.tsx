import InputText from '@/shared/components/common/form/InputText';
import { Form, FormField } from '@/shared/components/common/ui/form';
import { IWeeklyReport, useGetListWeeklyReport } from '@/shared/schemas/models/IWeeklyReport';
import { isLaterThan } from '@/shared/utils/functions/compareTime';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MoveLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputDatePicker from '../../common/form/InputDatePicker';
import InputTextArea from '../../common/form/InputTextArea';
import { Button } from '../../common/ui/button';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { findNextDay } from '@/shared/utils/functions/DateUtil';

type Props = {
    onSubmit: (value: Partial<IWeeklyReport>) => void;
    isLoading?: boolean;
    defaultValue?: Partial<IWeeklyReport>;
    onBack?: () => void;
    viewOnly: boolean
};

const formSchema = z.object({
    fromDate: z.any({ required_error: 'Vui lòng chọn ngày làm việc' }),
    toDate: z.any({ required_error: 'Vui lòng chọn ngày làm việc' }),
    plan: z.string({ required_error: 'Vui lòng điền kế hoạch công việc' }),
    logWork: z.string({ required_error: 'Vui lòng điền công việc thực hiện' }),
    workDone: z.string({ required_error: 'Vui lòng điền công việc đã hoàn thành' }),
    result: z.string({ required_error: 'Vui lòng điền kết quả công việc' }),
    unfinishedWork: z.string().nullish(),
    educationSuggest: z.string().nullish(),
    valuation: z.string().nullish(),
})

export default function FormWeeklyReport({ onSubmit, isLoading, defaultValue, onBack, viewOnly = false }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fromDate: "",
            toDate: ""
        }
    })
    const fromDateValue = form.watch().fromDate
    const toDateValue = form.watch().toDate
    useEffect(() => {
        if (dayjs(fromDateValue).isAfter(dayjs(toDateValue))) {
            form.setError('fromDate', { message: "Ngày bắt đầu phải trước ngày kết thúc", type: 'onChange' })
        } else {
            form.clearErrors('fromDate')

        }
    }, [fromDateValue, toDateValue])
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
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onError={e => {
                    console.log(e);
                }}
                className='space-y-4'

            >
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 '>
                    <InputDatePicker form={form} fieldName='fromDate' label='Ngày bắt đầu' placeHolder='Chọn ngày bắt đầu'/>
                    <InputDatePicker form={form} fieldName='toDate' label='Ngày kết thúc' placeHolder='Chọn ngày kết thúc'/>
                </div>
                <InputTextArea form={form} fieldName='plan' label='Kế hoạch công việc' size={5}/>
                <InputTextArea form={form} fieldName='logWork' label='Công việc thực tế' size={5}/>
                <InputTextArea form={form} fieldName='workDone' label='Công việc đã hoàn thành' size={5}/>
                <InputTextArea form={form} fieldName='result' label='Kết quả công việc' size={5}/>
                <InputTextArea form={form} fieldName='unfinishedWork' label='Công việc chưa hoàn thành' size={5}/>
                <InputText form={form} fieldName='valuation' label='Mức độ hoàn thành (%) ' />
                <InputText form={form} fieldName='educationSuggest' label='Đề xuất đào tạo' />

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
