import { Button } from "@/shared/components/common/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/common/ui/dialog"
import { useEffect, useState } from "react"
import { Form } from "../ui/form"
import InputPassword from "../form/InputPassword"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = {
    title?: React.ReactNode,
    content?: React.ReactNode,
    triggerCpn: React.ReactNode,
    onOk: (value: { confirmPassword: string, newPassword: string }) => void
}
const formSchema = z.object({
    confirmPassword: z.string({ required_error: 'Vui lòng xác nhận mật khẩu mới' }).min(1, { message: 'Vui lòng xác nhận mật khẩu mới' }),
    newPassword: z.string({ required_error: 'Vui lòng điền mật khẩu mới' }).min(1, { message: 'Vui lòng điền mật khẩu mới' }),
})
export function ChangePassDialog(props: Props) {
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const confirmPass = form.watch().confirmPassword
    const newPass = form.watch().newPassword
    useEffect(() => {
        if (confirmPass !== newPass && confirmPass) {
            form.setError('confirmPassword', { message: 'Xác nhận mật khẩu không trùng khớp', type: 'onChange' })
        } else {
            form.clearErrors('confirmPassword')
        }
    }, [confirmPass, newPass])
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>
                {props.triggerCpn}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(props.onOk)} onError={e => { console.log(e) }} className="space-y-4">
                        <InputPassword form={form} fieldName="newPassword" label='Nhập mật khẩu mới' />
                        <InputPassword form={form} fieldName="confirmPassword" label='Xác nhận mật khẩu mới' />
                        <DialogFooter>
                            <Button type="submit">Lưu</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
