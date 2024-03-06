import FormChangePassword from '@/shared/components/business/FormChangePassword'
import InputText from '@/shared/components/common/form/InputText'
import { Button, buttonVariants } from '@/shared/components/common/ui/button'
import { Form } from '@/shared/components/common/ui/form'
import { Separator } from '@/shared/components/common/ui/separator'
import { useAppSelector } from '@/shared/hooks/useRedux'
import { IUser, useSelfUpdateUser, useUpdateUser } from '@/shared/schemas/models/IUser.model'
import { cn } from '@/shared/utils/tailwind/functions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}
const formSchema = z.object({
  userName: z.string({ required_error: 'Vui lòng điền tên hệ thống của người dùng' }).min(1, { message: 'Vui lòng điền tên hệ thống của người dùng' }),
  fullName: z.string({ required_error: 'Vui lòng điền tên người dùng' }).min(1, { message: 'Vui lòng điền tên người dùng' }),

  departmentDisable: z.any(),
  departmentId: z.any(),
  jobPositionDisable: z.any(),
  jobPositionId: z.any(),
})
export default function AccountSetting({ }: Props) {
  const user = useAppSelector(state => state.appSlice.user)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user
  })
  useEffect(() => {
    if (user) {
      form.setValue('fullName', user.fullName)
      form.setValue('userName', user.userName)
      form.setValue('departmentDisable', user.department?.name)
      form.setValue('departmentId', user.department?.id)
      form.setValue('jobPositionDisable', user.jobPosition?.name)
      form.setValue('jobPositionId', user.jobPosition?.id)
    }
  }, [user, form])
  const [tab, setTab] = useState(1)
  const sidebarNavItems = [
    {
      title: "Tài khoản",
      tab: 1,
      isDisable: false

    },
    {
      title: "Đổi mật khẩu",
      tab: 2,
      isDisable: false
    },
  ]

  const handleUpdate = useSelfUpdateUser()
  function onSubmit(values: Partial<IUser>) {

    handleUpdate.mutate({ id: user!.id, User: values })
  }
  if (!user) return <></>
  return (
    <div className="w-full space-y-6 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Cài đặt tài khoản</h2>
        <p className="text-muted-foreground">
          Quản lý thông tin tài khoản của bạn
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav
            className={cn(
              "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"
            )}

          >
            {sidebarNavItems.map((item) => (
              <span
                onClick={(e) => {
                  if (item.isDisable) e.preventDefault()
                  else setTab(item.tab)
                }}
                key={item.tab}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  item.isDisable && 'cursor-not-allowed opacity-40',
                  tab === item.tab
                    ? "bg-foreground/10 font-semibold"
                    : "hover:bg-foreground/10 hover:underline",
                  "justify-start"
                )}
              >
                {item.title}
              </span>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {tab === 1 &&
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} onError={e => { console.log(e) }} className="space-y-4">
                <InputText form={form} fieldName="userName" label='Tên hệ thống' />
                <InputText form={form} fieldName="fullName" label='Tên đầy đủ' />
                <InputText form={form} fieldName="departmentDisable" label='Phòng làm việc' inputProps={{ defaultValue: user.department?.name, disabled: true }} />
                <InputText form={form} fieldName="jobPositionDisable" label='Vị trí' inputProps={{ defaultValue: user.jobPosition?.name, disabled: true }} />
                <div className='flex justify-start gap-4'>
                  <Button type="submit" > {handleUpdate.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Lưu</Button>
                </div>
              </form>
            </Form>
          }
          {
            tab === 2 && <FormChangePassword userId={user.id} />
          }
        </div>
      </div>
    </div>

  )
}