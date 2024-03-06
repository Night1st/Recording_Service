import InputText from '@/shared/components/common/form/InputText';
import { Form } from '@/shared/components/common/ui/form';
import { ICommonCode } from '@/shared/schemas/models/ICommonCode';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MoveLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputTextArea from '../../common/form/InputTextArea';
import { Button } from '../../common/ui/button';
import { useEffect } from 'react';
import InputSelect from '../../common/form/InputSelect';

type Props = {
    onSubmit: (value: Partial<ICommonCode>) => void;
    isLoading?: boolean;
    defaultValue?: Partial<ICommonCode>;
    onBack?: () => void;
};

const formSchema = z.object({
    type: z.string({ required_error: 'Vui lòng điền thông tin trên' }),
    value: z.string({ required_error: 'Vui lòng điền thông tin trên' }),
    description: z.any(),
    sort: z.any(),
    // ignoreDelete: z.any(),
})

export default function FormCommonCode({ onSubmit, isLoading, defaultValue, onBack }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue
    })
    useEffect(() => {
        if (defaultValue) {
            for (const [key, value] of Object.entries(defaultValue)) {
                form.setValue(key as any, value, {
                    shouldValidate: true,
                    shouldDirty: true
                })
            }
        }
    }, [defaultValue, form])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onError={e => { console.log(e) }} className="space-y-4">
                {/* <InputText form={form} fieldName="type" label='Loại' /> */}
                <InputSelect form={form} fieldName="type" label='Loại' options={[{ value: 'level', label: 'level' }]} />
                <InputText form={form} fieldName="value" label='Trình độ' />
                <InputTextArea form={form} fieldName="description" label='Mô tả' />
                <InputText form={form} fieldName="sort" label='Thứ tự' inputProps={{ type: "number" }} />
                {/* <InputText form={form} fieldName="ignoreDelete" label='Bỏ qua thao tác xóa' /> */}
                <div className='flex justify-start gap-4'>
                    <Button type='reset' onClick={() => onBack && onBack()} variant={'outline'}>  <MoveLeft className="mr-2 h-4 w-4 " /> Hủy</Button>
                    <Button type="submit" > {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Lưu</Button>
                </div>
            </form>
        </Form>
    )
}
