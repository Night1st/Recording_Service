
import { logout } from '@/shared/stores/appSlice';
import { KeySquare, LogOutIcon, Moon, Settings, Sun, User2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Button } from '../common/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../common/ui/dropdown-menu';

const UserNameTag = dynamic(() => import('./UserTag'), { ssr: false })

const AccountSetting = () => {
    const { setTheme, theme } = useTheme();

    const dispatch = useDispatch()
    const router = useRouter()
    function handleLogout() {
        router.push('/login')
        dispatch(logout())
    }
    return (
        <div className='flex gap-4 items'>
            <UserNameTag />
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <div>
                        <Button variant="outline" size="icon">
                            <User2 className="h-[1.2rem] w-[1.2rem] " />
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push('/accountSetting')} className='flex justify-between'>
                        Tài khoản <Settings className='h-[1.2rem] w-[1.2rem] ml-3' />
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => {
                        if (theme === 'light') {
                            setTheme('dark')
                        }
                        else {
                            setTheme('light')
                        }
                    }} className='flex justify-between'>
                        Đổi theme
                        {
                            theme === 'light' ? <Sun className="h-[1.2rem] w-[1.2rem] ml-3" /> :
                                <Moon className="h-[1.2rem] w-[1.2rem]  ml-3" />
                        }

                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLogout()} className='flex justify-between'>
                        Đăng xuất <LogOutIcon className='h-[1.2rem] w-[1.2rem] ml-3' />
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu >
        </div>

    );
};

export default AccountSetting;
