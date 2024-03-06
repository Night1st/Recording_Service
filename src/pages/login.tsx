

import InputPassword from '@/shared/components/common/form/InputPassword';
import InputText from '@/shared/components/common/form/InputText';
import { Button, buttonVariants } from '@/shared/components/common/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/shared/components/common/ui/card';
import { Form } from '@/shared/components/common/ui/form';
import { Tabs, TabsContent } from '@/shared/components/common/ui/tabs';
import BlankLayout from '@/shared/components/layouts/BlankLayout';
import { useLogin } from '@/shared/schemas/models/IUser.model';
import { cn } from '@/shared/utils/tailwind/functions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Login = () => {
    const formSchema = z.object({
        username: z.string({ required_error: "Vui lòng điền tên đăng nhập" }).min(1, { message: "Vui lòng điền tên đăng nhập" }),
        password: z.string({ required_error: "Vui lòng điền mật khẩu" }).min(1, { message: "Vui lòng điền mật khẩu" }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const doLogin = useLogin()
    function onSubmit(values: z.infer<typeof formSchema>) {
        doLogin.mutate(values)
    }
    return (
        <>
            <div className="relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                {/* <Link
                    href="#"
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'absolute right-4 top-4 md:right-8 md:top-8'
                    )}
                    
                >
                    Request to create an account
                </Link> */}
                <div className="relative md:h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900 login-background" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Image src="/ngsLogo.png" width={48} height={48} alt="Logo" />
                        &nbsp; {process.env.NEXT_PUBLIC_APP_NAME}
                    </div>
                    <div className="relative z-20 mt-auto">
                        <h1 className="text-4xl font-semibold tracking-tight">
                            <div className='text-yellow-400'>EMPOWER</div>
                            <div>SUCCESS</div>
                        </h1>
                        <p className="mt-4 text-lg">
                            NGS nỗ lực trở thành doanh nghiệp hàng đầu Việt Nam, cung cấp các giải pháp - dịch vụ thông minh; đem lại giá trị lớn và phù hợp nhất cho khách hàng.
                        </p>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">Copyright &copy; NGSD  2023</p>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

                        <Tabs defaultValue="merchant" className="w-[350px] mx-auto mt-4">
                            {/* <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="admin">Admin</TabsTrigger>
                            </TabsList> */}

                            {/* Merchant Login */}
                            <TabsContent value="merchant">
                                <Card className="w-[350px]">
                                    <CardHeader>
                                        <CardTitle>Đăng nhập</CardTitle>
                                        <CardDescription>
                                            Nhập tên đăng nhập và mật khẩu để tiếp tục
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Form {...form} >
                                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                                <div className="grid w-full items-center gap-4">
                                                    <InputText form={form} fieldName="username" label='Tên đăng nhập' placeHolder='@ngs.com.vn' />
                                                    <InputPassword form={form} fieldName="password" label='Mật khẩu' inputProps={{ type: 'password' }} />
                                                    <div className="flex flex-col items-start my-2">
                                                        <Button variant="link" type='button' disabled className="p-0 h-auto">
                                                            Quên mật khẩu?
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Button className="w-full flex gap-2" type='submit'>{doLogin.isLoading && <Loader2 size={16} className='animate-spin' />} Đăng nhập</Button>
                                                </div>
                                            </form>
                                        </Form>
                                    </CardContent>

                                </Card>
                            </TabsContent>
                        </Tabs>
                        {/* <p className="px-8 text-center text-sm text-muted-foreground pb-6">
                            By logging in, you agree to our <br />
                            <Link
                                href="#"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="#"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p> */}
                    </div>
                </div>
            </div>
        </>

    );
};

Login.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>


export default Login;
